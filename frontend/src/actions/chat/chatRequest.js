import {
    GET_REQUEST_SUCCESS,
    GET_REQUEST_FAIL,
}
    from './types';
import { getToken, request_refresh } from '../auth/auth';
import { API_URL } from '../../config';

export const get_chat_requests = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/chat/room/request_list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: GET_REQUEST_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: GET_REQUEST_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: GET_REQUEST_FAIL
        })
        if (callback) callback([false, error]);
    }
};
