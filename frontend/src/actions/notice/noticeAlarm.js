import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    GET_NOTICE_ALARM_SUCCESS,
    GET_NOTICE_ALARM_FAIL,
}
    from './types';

export const get_notice_alarm = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/notice/alarm`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: GET_NOTICE_ALARM_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: GET_NOTICE_ALARM_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: GET_NOTICE_ALARM_FAIL
        })
        
        if (callback) callback([false, error]);
    }
};
