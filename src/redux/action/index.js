import { INCREMENT, DECREMENT, SET_PROFILE, SET_MENU, SET_LOAD } from '../types';

export const setProfileUser = (payload) => {
    return {
        type: SET_PROFILE,
        payload: payload,
    };
};


export const setMenu = (payload) => {
    return {
        type: SET_MENU,
        payload: payload,
    };
};

export const setLoad = (payload) => {
    return {
        type: SET_LOAD,
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