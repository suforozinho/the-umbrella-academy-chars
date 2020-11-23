import charactersDb from '../characters-db';

const initialState = charactersDb;

export default function mainReducer(store = initialState, action) {
  switch (action.type) {
    case 'SEARCH_CHARACTER':
      if (action.name === '') {
        return initialState;
      } else {
        return charactersDb.filter(character => character.name.includes(action.name.toLowerCase()));
      }
    default:
      return store;
  }
}