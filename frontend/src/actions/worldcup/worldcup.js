import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import {
    LOAD_WORLDCUP_FAIL,
    LOAD_WORLDCUP_SUCCESS,
} from './types'

export const load_worldcups = (callback) => async dispatch => {
    
    try {
        const res = await fetch(`${API_URL}/api/worldcup/`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_WORLDCUP_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_WORLDCUP_FAIL
            })
            if (callback) callback([false, apiRes.message]);  
        }
    } catch (error) {
        dispatch({
            type: LOAD_WORLDCUP_FAIL
        })
        if (callback) callback([false, error]);
    }
}

export const load_nonuser_detail_worldcup = (placeId, callback) => async dispatch => {
    
    try {
        const res = await fetch(`${API_URL}/api/worldcup/nonuser/place/${placeId}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_WORLDCUP_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_WORLDCUP_FAIL
            })
            if (callback) callback([false, apiRes.message]);  
        }
    } catch (error) {
        dispatch({
            type: LOAD_WORLDCUP_FAIL
        })
        if (callback) callback([false, error]);
    }
}

export const load_user_detail_worldcup = (placeId, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/worldcup/user/place/${placeId}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`,
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_WORLDCUP_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_WORLDCUP_FAIL
            })
            if (callback) callback([false, apiRes.message]);  
        }
    } catch (error) {
        dispatch({
            type: LOAD_WORLDCUP_FAIL
        })
        if (callback) callback([false, error]);
    }
}

export const enroll_worldcup = (placeId, userId, callback) => async dispatch => {
    const body = JSON.stringify({
        place_id: placeId,
        user_id: userId,
    });

    try {
        const res = await fetch(`${API_URL}/api/worldcup/place/${placeId}`, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);  
        }
    } catch (error) {
        if (callback) callback([false, error]);
    }
}
