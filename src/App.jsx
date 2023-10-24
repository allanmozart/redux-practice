import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addFavoriteAction,
  removeFavoriteAction,
} from './store/favorites/actions';
// import { getFavorites } from './store/favorites/selectors';
import { debounce } from 'lodash';
import { getAllCharacters, searchCharacterName } from './api/character';
import './style.css';

function App() {
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState({});
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const favoriteCharacters = useSelector((state) => state.favorites);

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

  const handleAddCharacter = (character) => {
    dispatch(addFavoriteAction(character));
  };
  const handleRemoveCharacter = (character) => {
    dispatch(removeFavoriteAction(character));
  };

  return (
    <>
      <ul>
        {favoriteCharacters &&
          favoriteCharacters.map((item) => (
            <li key={item.id} className="character-box">
              <h3>{item.name}</h3>
              <img src={item.image} />
              <button onClick={() => handleRemoveCharacter(item)}>
                Remove from favorites
              </button>
            </li>
          ))}
      </ul>
      <p>Number of characters: {characters.count}</p>
      <label htmlFor="search">Search characters: </label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={handleSearch}
      ></input>
      <ul className="search-results-list">
        {results &&
          results.map((item) => (
            <li key={item.id} className="character-box">
              <h3>{item.name}</h3>
              <img src={item.image} />
              <button onClick={() => handleAddCharacter(item)}>
                Add to favorites
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;
