import {
    GET_CHAT_ALARM_SUCCESS,
    GET_CHAT_ALARM_FAIL,
} from '../actions/chat/types'
import { LOGOUT_SUCCESS } from '../actions/auth/types';

const initialState = {
    chatAlarm: false,
};

const chatAlarmReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_CHAT_ALARM_SUCCESS:
            return {
                ...state,
                chatAlarm: payload
            }
        case GET_CHAT_ALARM_FAIL:
            return {
                ...state,
                chatAlarm: false
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default chatAlarmReducer;