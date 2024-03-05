import { API_URL } from '../../config/index';
import { getToken, request_refresh } from '../auth/auth';
import { 
    LOAD_PERSONAL_REQUEST_SUCCESS,
    LOAD_PERSONAL_REQUEST_FAIL,
} 
from './types';

export const load_personal_requests = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/personal-chat-request`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });
        
        const apiRes = await res.json();

        if (res.status === 200) {
            await dispatch({
                type: LOAD_PERSONAL_REQUEST_SUCCESS,
                payload: apiRes.data,
            })
            if (callback) callback([true, apiRes.message]);
        }
        else {
            await dispatch({
                type: LOAD_PERSONAL_REQUEST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        dispatch({
            type: LOAD_PERSONAL_REQUEST_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const send_personal_request = (link, receiverId, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({
        link,
        receiver_id: receiverId,
    });

    try {
        const res = await fetch(`${API_URL}/api/personal-chat-request`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body,
        });
        
        const apiRes = await res.json();
        console.log(res.status, apiRes.message);
        
        if (res.status === 201) {
            if (callback) callback([true, apiRes.message]);
        }
        else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        if (callback) callback([false, error]);
    }
}

export const reply_personal_request = (requestId, status, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({ status });

    try {
        const res = await fetch(`${API_URL}/api/personal-chat-request/${requestId}`,{
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body,
        });
        
        const apiRes = await res.json();
        await dispatch(load_personal_requests());

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);
        }
        else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        if (callback) callback([false, error]);
    }
}