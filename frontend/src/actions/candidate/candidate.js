import { API_URL } from '../../config';
import { getToken, request_refresh } from '../auth/auth';
import { 
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_FAIL
} from './types';

export const load_candidate = (isAuthenticated, callback) => async dispatch => {
    try {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        
        if (isAuthenticated) {
            const access = await dispatch(getToken('access'));
            headers['Authorization'] = `Bearer ${access}`;
        }

        console.log('후보자 프로필 조회 요청, 로그인 여부: ', isAuthenticated);
        console.log('헤더: ', headers);

        const res = await fetch(`${API_URL}/api/matching/profiles`, {
            method: 'GET',
            headers: headers
        });

        const apiRes = await res.json();

        if(res.status === 200) {
            dispatch({
                type: LOAD_CANDIDATE_SUCCESS,
                payload: apiRes.data
            });
            if(callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_CANDIDATE_FAIL
            });
            if(callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CANDIDATE_FAIL
        });
        if(callback) callback([false, error]);
    }
}