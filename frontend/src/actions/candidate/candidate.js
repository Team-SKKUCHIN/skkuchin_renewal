import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import { 
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_FAIL
} from './types';

export const load_candidate = (callback) => async dispatch => {
    try {
        try {
            await dispatch(request_refresh());
            const access = await dispatch(getToken('access'));

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (access) headers['Authorization'] = `Bearer ${access}`;

            const res = await fetch(`${API_URL}/api/matching/profiles`, {
                method: 'GET',
                headers: headers
            });

            const apiRes = await res.json();

            if (res.status === 200) {
                dispatch({
                    type: LOAD_CANDIDATE_SUCCESS,
                    payload: apiRes.data
                });
                if (callback) callback([true, apiRes.message]);
            } else {
                dispatch({
                    type: LOAD_CANDIDATE_FAIL
                });
                if (callback) callback([false, apiRes.message]);
            }
        } catch (tokenError) {
            const res = await fetch(`${API_URL}/api/matching/profiles`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const apiRes = await res.json();

            if (res.status === 200) {
                dispatch({
                    type: LOAD_CANDIDATE_SUCCESS,
                    payload: apiRes.data
                });
                if (callback) callback([true, apiRes.message]);
            } else {
                dispatch({
                    type: LOAD_CANDIDATE_FAIL
                });
                if (callback) callback([false, apiRes.message]);
            }
        }
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CANDIDATE_FAIL
        });
        if (callback) callback([false, error]);
    }
}