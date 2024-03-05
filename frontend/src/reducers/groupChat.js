import {
    GET_GROUP_CHAT_REQUEST_SUCCESS,
    GET_GROUP_CHAT_REQUEST_FAIL,
    REQUEST_GROUP_CHAT_SUCCESS,
    REQUEST_GROUP_CHAT_FAIL,
    REPLY_GROUP_CHAT_REQUEST_SUCCESS,
    REPLY_GROUP_CHAT_REQUEST_FAIL,
} from '../actions/groupChat/type';

const initialState = {
    groupChatRequest: [],
};

const groupChatReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_GROUP_CHAT_REQUEST_SUCCESS:
            return {
                ...state,
                groupChatRequest: payload
            }
        case GET_GROUP_CHAT_REQUEST_FAIL:
            return {
                ...state,
                groupChatRequest: []
            }
        case REQUEST_GROUP_CHAT_SUCCESS:
            return {
                ...state,
            }
        case REQUEST_GROUP_CHAT_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    };
}