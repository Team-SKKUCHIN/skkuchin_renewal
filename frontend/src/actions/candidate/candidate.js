import { API_URL } from '../../config';
import { 
    LOAD_CANDIDATE_SUCCESS,
    LOAD_CANDIDATE_FAIL
} from './types';

export const load_candidate = () => async dispatch => {
    try {
        const res = await fetch(`${API_URL}/api/matching`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const apiRes = await res.json();

        if(res.status === 200) {
            dispatch({
                type: LOAD_CANDIDATE_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: LOAD_CANDIDATE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CANDIDATE_FAIL
        });
    }
}