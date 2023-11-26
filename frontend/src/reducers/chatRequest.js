import {
    GET_REQUEST_SUCCESS,
    GET_REQUEST_FAIL,
} from '../actions/chat/types'
import { LOGOUT_SUCCESS } from '../actions/auth/types';

const initialState = {
    chatRequest: [],
};

const chatRequestReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_REQUEST_SUCCESS:
            return {
                ...state,
                chatRequest: payload
            }
        case GET_REQUEST_FAIL:
            return {
                ...state,
                chatRequest: []
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default chatRequestReducer;