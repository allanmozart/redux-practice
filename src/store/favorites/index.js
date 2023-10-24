const initialState = [];

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const addedState = [...state, action.payload];
      return addedState;
    }

    case 'REMOVE_FAVORITE': {
      const removedState = [...state].filter(
        (item) => item.id !== action.payload.id
      );
      return removedState;
    }

    default:
      return state;
  }
};

export default favoriteReducer;
