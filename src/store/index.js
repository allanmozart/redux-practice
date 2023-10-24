import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import favoriteReducer from "./favorites";

const rootReducer = combineReducers({
  favorites: favoriteReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  rootReducer
);

const store = createStore(persistedReducer, composeWithDevTools());

persistStore(store);

export default store;
