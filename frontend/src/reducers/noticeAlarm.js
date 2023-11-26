import { LOGOUT_SUCCESS } from '../actions/auth/types';
import {
    GET_NOTICE_ALARM_SUCCESS,
    GET_NOTICE_ALARM_FAIL,
} from '../actions/notice/types'

const initialState = {
    noticeAlarm: false,
};

const noticeAlarmReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case GET_NOTICE_ALARM_SUCCESS:
            return {
                ...state,
                noticeAlarm: payload
            }
        case GET_NOTICE_ALARM_FAIL:
            return {
                ...state,
                noticeAlarm: false
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    };
}

export default noticeAlarmReducer;