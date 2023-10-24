import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { getAllCharacters, searchCharacterName } from './api/character';
import './style.css';

function App() {
  const [characters, setCharacters] = useState({});
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      const newCharacters = await getAllCharacters();
      setCharacters(newCharacters);
    };

    getInfo();
  }, []);

  const debouncedSearch = debounce(async (queryText) => {
    const newResults = await searchCharacterName(queryText);
    setResults(newResults);
  }, 2000);

  const handleSearch = async (event) => {
    setQuery(event.target.value);
    debouncedSearch(query);
  };

  return (
    <>
      <p>Number of characters: {characters.count}</p>
      <label htmlFor="search">Search characters: </label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={handleSearch}
      ></input>
      <ul>
        {results &&
          results.map((item) => (
            <li key={item.id} className="search-result">
              <h3>{item.name}</h3>
              <img src={item.image} />
              <button>Add to favorites</button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
