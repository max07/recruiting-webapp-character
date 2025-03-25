import React, { createContext, useReducer } from 'react';
import { SKILL_LIST } from '../consts';
import { v4 as uuidv4 } from 'uuid'; // Install uuid with `npm install uuid`

function computeModifier(score) {
  if (score === undefined || score === null) {
    score = 0; // Default to 0 if score is undefined or null
  }
  return Math.floor((score - 10) / 2);
}

/** Create a new "blank" character */
function createCharacter(name) {
  const skillPoints = {};
  SKILL_LIST.forEach((skill) => {
    skillPoints[skill.name] = 0;
  });
  return {
    id: uuidv4(), // Generate a unique id for each character
    name,
    attributes: {
      Strength: 10,
      Dexterity: 10,
      Constitution: 10,
      Intelligence: 10,
      Wisdom: 10,
      Charisma: 10,
    },
    skillPoints,
  };
}

/** Sum all attribute values on a character */
function sumAttributes(attributes) {
  if (!attributes || typeof attributes !== 'object') {
    console.error('Invalid attributes object:', attributes); // Debugging log
    return 0; // Return 0 if attributes is undefined or invalid
  }

  return Object.values(attributes).reduce((sum, value) => sum + value, 0);
}

/** Skill points = 10 + (4 * INT Modifier) */
function getSkillPointCap(character) {
  const intMod = computeModifier(character.attributes.Intelligence);
  return 10 + intMod * 4;
}


const initialState = {
  characters: [
    {
      id: 1,
      name: 'Hero 1',
      attributes: {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10,
      },
      skillPoints: {}, // Initialize skill points if needed
    },
  ],
};

function characterReducer(state, action) {
  switch (action.type) {
    case 'ADD_CHARACTER': {
      const newCharacter = createCharacter(`Hero ${state.characters.length + 1}`);
      return {
        ...state,
        characters: [...state.characters, newCharacter],
      };
    }

    case 'RESET_CHARACTERS': {
      return initialState; // Reset to the initial state
    }

    case 'INCREMENT_ATTRIBUTE': {
      const { charIndex, attr } = action.payload;
      const newCharacters = [...state.characters];
      const character = { ...newCharacters[charIndex] };

      // Ensure attributes object is initialized
      character.attributes = character.attributes || {};

      if (sumAttributes(character.attributes) < 70) {
        character.attributes = {
          ...character.attributes,
          [attr]: (character.attributes[attr] || 0) + 1,
        };
      }

      newCharacters[charIndex] = character;
      console.log('Updated Characters (Increment):', newCharacters); // Debugging log
      return { ...state, characters: newCharacters };
    }

    case 'DECREMENT_ATTRIBUTE': {
      const { charIndex, attr } = action.payload;
      const newCharacters = [...state.characters];
      const character = { ...newCharacters[charIndex] };

      if (character.attributes[attr] > 0) {
        character.attributes = {
          ...character.attributes,
          [attr]: character.attributes[attr] - 1,
        };
      }

      newCharacters[charIndex] = character;
      console.log('Updated Characters (Decrement):', newCharacters); // Debugging log
      return { ...state, characters: newCharacters };
    }

    case 'INCREMENT_SKILL': {
      const { charIndex, skillName } = action.payload;
      const newCharacters = [...state.characters];
      const character = { ...newCharacters[charIndex] };

      // Ensure skillPoints object is initialized
      character.skillPoints = character.skillPoints || {};

      // Check if total skill points spent exceeds the cap
      const totalPointsSpent = Object.values(character.skillPoints).reduce((sum, points) => sum + points, 0);
      const skillPointCap = getSkillPointCap(character);

      if (totalPointsSpent < skillPointCap) {
        character.skillPoints[skillName] = (character.skillPoints[skillName] || 0) + 1;
      }

      newCharacters[charIndex] = character;
      return { ...state, characters: newCharacters };
    }

    case 'DECREMENT_SKILL': {
      const { charIndex, skillName } = action.payload;
      const newCharacters = [...state.characters];
      const character = { ...newCharacters[charIndex] };

      // Ensure skillPoints object is initialized
      character.skillPoints = character.skillPoints || {};

      if (character.skillPoints[skillName] > 0) {
        character.skillPoints[skillName] -= 1;
      }

      newCharacters[charIndex] = character;
      return { ...state, characters: newCharacters };
    }

    default:
      return state;
  }
}

/** ===============  CONTEXT  =============== */
export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  return (
    <CharacterContext.Provider value={{ state, dispatch, computeModifier }}>
      {children}
    </CharacterContext.Provider>
  );
};