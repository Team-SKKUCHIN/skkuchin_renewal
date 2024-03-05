import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_PERSONAL_REQUEST_SUCCESS,
    LOAD_PERSONAL_REQUEST_FAIL,
    REQUEST_PERSONAL_CHAT_SUCCESS,
    REQUEST_PERSONAL_CHAT_FAIL,
} from '../actions/personalChatRequest/types';

const initialState = {
    requests: null,
};

const personalChatRequestReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_PERSONAL_REQUEST_SUCCESS:
            return {
                ...state,
                requests: payload
            }
        case LOAD_PERSONAL_REQUEST_FAIL:
            return {
                ...state,
                requests: null
            }
        case REQUEST_PERSONAL_CHAT_SUCCESS:
            return {
                ...state,
            }
        case REQUEST_PERSONAL_CHAT_FAIL:
            return {
                ...state,
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default personalChatRequestReducer;