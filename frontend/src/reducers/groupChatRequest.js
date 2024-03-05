import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_GROUP_REQUEST_SUCCESS,
    LOAD_GROUP_REQUEST_FAIL,
    REQUEST_GROUP_CHAT_SUCCESS,
    REQUEST_GROUP_CHAT_FAIL,
} from '../actions/groupChatRequest/types';

const initialState = {
    requests: null,
};

const groupChatRequestReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOAD_GROUP_REQUEST_SUCCESS:
            return {
                ...state,
                requests: payload
            }
        case LOAD_GROUP_REQUEST_FAIL:
            return {
                ...state,
                requests: null
            }
        case REQUEST_GROUP_CHAT_SUCCESS:
            return {
                ...state,
            }
        case REQUEST_GROUP_CHAT_FAIL:
            return {
                ...state,
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default groupChatRequestReducer;