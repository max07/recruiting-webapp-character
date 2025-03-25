import React, { useState, useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { SKILL_LIST } from '../consts';

// Function to compute the modifier based on an attribute value
const computeModifier = (attributeValue) => Math.floor((attributeValue - 10) / 2);

function SkillCheckSection() {
  const { state, dispatch } = useContext(CharacterContext);
  const character = state.characters[0]; // Assuming we're working with the first character
  const [selectedSkill, setSelectedSkill] = useState('');
  const [dc, setDc] = useState(10);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const skill = SKILL_LIST.find((s) => s.name === selectedSkill);
    const modifier = computeModifier(character.attributes[skill.attributeModifier]);
    const total = roll + (character.skillPoints[selectedSkill] || 0) + modifier;
    setResult({ roll, total, success: total >= dc });
  };

  const incrementSkill = (skillName) => {
    dispatch({ type: 'INCREMENT_SKILL', payload: { charIndex: 0, skillName } });
  };

  const decrementSkill = (skillName) => {
    dispatch({ type: 'DECREMENT_SKILL', payload: { charIndex: 0, skillName } });
  };

  return (
    <div>
      <h3>Skill Check</h3>
      <select onChange={(e) => setSelectedSkill(e.target.value)} value={selectedSkill}>
        <option value="">Select Skill</option>
        {SKILL_LIST.map((skill) => (
          <option key={skill.name} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={dc}
        onChange={(e) => setDc(Number(e.target.value))}
        placeholder="DC"
      />
      <button onClick={handleRoll}>Roll</button>
      {result && (
        <p>
          Roll: {result.roll}, Total: {result.total}, {result.success ? 'Success' : 'Failure'}
        </p>
      )}
      <h4>Skills</h4>
      {SKILL_LIST.map((skill) => (
        <div key={skill.name}>
          <strong>{skill.name}</strong> (Modifier: {computeModifier(character.attributes[skill.attributeModifier])})
          <br />
          Points: {character.skillPoints[skill.name] || 0}
          <button onClick={() => incrementSkill(skill.name)}>+</button>
          <button onClick={() => decrementSkill(skill.name)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default SkillCheckSection;