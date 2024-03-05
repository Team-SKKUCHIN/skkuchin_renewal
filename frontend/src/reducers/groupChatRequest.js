import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    LOAD_GROUP_REQUEST_SUCCESS,
    LOAD_GROUP_REQUEST_FAIL,
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
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
};

export default groupChatRequestReducer;