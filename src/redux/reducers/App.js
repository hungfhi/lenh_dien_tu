import { INCREMENT, DECREMENT, SET_PROFILE, SET_MENU } from '../types';

    const INITIAL_STATE = {
        count: 0,
        user: null,
        menu: []
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
            case INCREMENT:
               return {
                 ...state, count: state.count + 1,
               };
            case DECREMENT:
               return {
                  ...state, count: state.count - 1,
               };
             default: return state;

        }

    };

    export default reducer;