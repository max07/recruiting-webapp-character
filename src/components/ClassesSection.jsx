import React, { useContext, useState, useEffect } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import { CLASS_LIST } from '../consts';

function ClassesSection() {
  const { state } = useContext(CharacterContext);
  const [selectedClass, setSelectedClass] = useState(null); // State to track the selected class
  const [qualifiedClasses, setQualifiedClasses] = useState({}); // State to track qualification status

  // Function to check if a character qualifies for a class
  const doesQualify = React.useCallback((cls) => {
    const character = state.characters[0]; // Get the first character
    if (!character) return false; // Ensure character exists
    const qualifies = Object.entries(cls.requirements).every(([attr, min]) => character.attributes[attr] >= min);
    console.log(`Class: ${cls.name}, Qualifies: ${qualifies}`); // Debugging log
    return qualifies;
  }, [state.characters]);

  // Update the qualification status whenever the character's attributes change
  useEffect(() => {
    if (!state.characters || state.characters.length === 0) return; // Ensure characters exist
    const updatedQualifiedClasses = {};
    CLASS_LIST.forEach((cls) => {
      updatedQualifiedClasses[cls.name] = doesQualify(cls);
    });
    setQualifiedClasses(updatedQualifiedClasses);
  }, [state.characters, doesQualify]); // Re-run whenever the character's attributes change

  const handleClassClick = (cls) => {
    // Toggle the selected class
    if (selectedClass && selectedClass.name === cls.name) {
      setSelectedClass(null); // Deselect if the same class is clicked
    } else {
      setSelectedClass(cls); // Select the clicked class
    }
  };

  return (
    <div>
      <h3>Classes</h3>
      {CLASS_LIST.map((cls) => (
        <div
          key={cls.name}
          style={{
            color: qualifiedClasses[cls.name] ? 'green' : 'red', // Dynamically update color
            cursor: 'pointer', // Indicate that the item is clickable
          }}
          onClick={() => handleClassClick(cls)} // Add onClick handler
        >
          {cls.name}
        </div>
      ))}

      {/* Display the selected class requirements */}
      {selectedClass && (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h4>{selectedClass.name} Requirements</h4>
          <ul>
            {Object.entries(selectedClass.requirements).map(([attr, min]) => (
              <li key={attr}>
                {attr}: {min}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClassesSection;