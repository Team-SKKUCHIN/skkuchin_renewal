import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_NOTICE_FAIL,
    LOAD_NOTICE_SUCCESS,
} from './types'

export const load_notices = (callback) => async dispatch => {
    
    try {
        const res = await fetch(`${API_URL}/api/notice`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_NOTICE_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_NOTICE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_NOTICE_FAIL
        })
        
        if (callback) callback([false, error]);
    }
}

export const read_notice = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/notice/read`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        if (callback) callback([false, error]);
    }
};
