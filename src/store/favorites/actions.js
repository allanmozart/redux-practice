export const addFavoriteAction = (character) => ({
  type: 'ADD_FAVORITE',
  payload: character,
});

export const removeFavoriteAction = (character) => ({
  type: 'REMOVE_FAVORITE',
  payload: character,
});
