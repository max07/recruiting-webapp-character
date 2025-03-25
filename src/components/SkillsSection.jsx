import React, { useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { SKILL_LIST } from '../consts';

function SkillsSection() {
  const { state, dispatch, computeModifier } = useContext(CharacterContext);

  const character = state.characters[0]; // Assuming we're working with the first character for now
  const intelligenceModifier = computeModifier(character.attributes.INT);
  const maxSkillPoints = 10 + 4 * intelligenceModifier;
  const totalPointsSpent = Object.values(character.skillPoints).reduce((sum, points) => sum + points, 0);

  const handleIncrement = (skillName) => {
    if (totalPointsSpent < maxSkillPoints) {
      dispatch({ type: 'INCREMENT_SKILL', payload: { charIndex: 0, skillName } });
    }
  };

  const handleDecrement = (skillName) => {
    if (character.skillPoints[skillName] > 0) {
      dispatch({ type: 'DECREMENT_SKILL', payload: { charIndex: 0, skillName } });
    }
  };

  return (
    <div>
      <h3>Skills</h3>
      <p>Points Spent: {totalPointsSpent} / {maxSkillPoints}</p>
      {SKILL_LIST.map((skill) => {
        const modifier = computeModifier(character.attributes[skill.attribute]);
        const pointsSpent = character.skillPoints[skill.name] || 0;
        const totalSkill = pointsSpent + modifier;

        return (
          <div key={skill.name} style={{ marginBottom: '1rem' }}>
            <strong>{skill.name}</strong> (Attribute: {skill.attribute}, Modifier: {modifier >= 0 ? `+${modifier}` : modifier})
            <br />
            Points: {pointsSpent} 
            <button onClick={() => handleIncrement(skill.name)} style={{ marginLeft: '0.5rem' }}>+</button>
            <button onClick={() => handleDecrement(skill.name)} style={{ marginLeft: '0.5rem' }}>-</button>
            <br />
            Total Skill: {totalSkill}
          </div>
        );
      })}
    </div>
  );
}

export default SkillsSection;