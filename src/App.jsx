import React from 'react';
import './App.css';
import { CharacterProvider, CharacterContext } from './context/CharacterContext';
import AttributesSection from './components/AttributesSection';
import ClassesSection from './components/ClassesSection';
import SkillsSection from './components/SkillsSection';
import { saveCharacters, fetchCharacters } from './api'; // Import the API functions

function AppHeaderControls() {
  const { state, dispatch } = React.useContext(CharacterContext);

  const handleAddCharacter = () => {
    dispatch({ type: 'ADD_CHARACTER' });
  };

  const handleResetCharacters = () => {
    dispatch({ type: 'RESET_CHARACTERS' });
  };

  const handleSaveCharacters = async () => {
    try {
      await saveCharacters(state.characters);
      alert('Characters saved successfully!');
    } catch (error) {
      alert('Failed to save characters: ' + error.message);
    }
  };

  const handleLoadCharacters = async () => {
    try {
      const characters = await fetchCharacters();
      dispatch({ type: 'SET_CHARACTERS', payload: characters });
    } catch (error) {
      alert('Failed to load characters: ' + error.message);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={handleAddCharacter} style={{ marginRight: '1rem' }}>
        Add New Character
      </button>
      <button onClick={handleResetCharacters} style={{ marginRight: '1rem' }}>
        Reset All Characters
      </button>
      <button onClick={handleSaveCharacters} style={{ marginRight: '1rem' }}>
        Save Characters
      </button>
      <button onClick={handleLoadCharacters}>
        Load Characters
      </button>
    </div>
  );
}

function AppContent() {
  React.useContext(CharacterContext);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Manoj Kalaskar</h1>
      </header>
      <section className="App-section">
        <AppHeaderControls />
        <div className="grid-container">
          <AttributesSection className="grid-item" />
          <ClassesSection className="grid-item" />
          <SkillsSection className="grid-item" />
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}