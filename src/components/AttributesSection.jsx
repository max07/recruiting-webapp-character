import React, { useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { ATTRIBUTE_LIST } from '../consts';

function AttributesSection() {
  const { state, dispatch } = useContext(CharacterContext);
  const character = state.characters[0]; // Assuming we're working with the first character

  const handleIncrement = (attr) => {
    console.log(`Incrementing ${attr}`); // Debugging log
    dispatch({ type: 'INCREMENT_ATTRIBUTE', payload: { charIndex: 0, attr } });
  };

  const handleDecrement = (attr) => {
    console.log(`Decrementing ${attr}`); // Debugging log
    dispatch({ type: 'DECREMENT_ATTRIBUTE', payload: { charIndex: 0, attr } });
  };

  return (
    <div>
      <h3>Attributes</h3>
      {ATTRIBUTE_LIST.map((attr) => (
        <div key={attr}>
          <strong>{attr}:</strong> {character.attributes[attr]}
          <button onClick={() => handleIncrement(attr)}>+</button>
          <button onClick={() => handleDecrement(attr)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default AttributesSection;