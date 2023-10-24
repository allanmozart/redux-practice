import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import favoriteReducer from './favorites';

const rootReducer = combineReducers({
  favorites: favoriteReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
