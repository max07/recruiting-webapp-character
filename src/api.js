const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{{github_username}}/character';

export async function saveCharacters(characters) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(characters),
    });

    if (!response.ok) {
      throw new Error(`Failed to save characters: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in saveCharacters:', error);
    throw error;
  }
}

export async function fetchCharacters() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchCharacters:', error);
    throw error;
  }
}