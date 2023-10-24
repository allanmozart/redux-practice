import axios from "axios";

export async function getAllCharacters() {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  return response.data.info;
}

export async function searchCharacterName(characterName) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${characterName}`
    );
    const characters = response.data.results.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
    }));
    return characters;
  } catch (error) {
    console.error(error.message);
  }
}
