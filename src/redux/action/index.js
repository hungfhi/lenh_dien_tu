import { INCREMENT, DECREMENT, SET_PROFILE } from '../types';

export const setProfileUser = (payload) => {
    return {
        type: SET_PROFILE,
        payload: payload,
    };
};

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
       type: DECREMENT,

    };

};