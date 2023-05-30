import { INCREMENT, DECREMENT, SET_PROFILE, SET_MENU, SET_LOAD,SET_DEFINITIONS } from '../types';

const INITIAL_STATE = {
  count: 0,
  user: null,
  menu: [],
  load: false,
  definitions: {}
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state, user: action.payload,
      };
    case SET_MENU:
      return {
        ...state, menu: action.payload,
      };
    case SET_LOAD:
      return {
        ...state, load: action.payload,
      };
    case INCREMENT:
      return {
        ...state, count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state, count: state.count - 1,
      };
    case SET_DEFINITIONS:
      return {
        ...state, definitions: action.payload,
      };
    default: return state;

  }

};

export default reducer;