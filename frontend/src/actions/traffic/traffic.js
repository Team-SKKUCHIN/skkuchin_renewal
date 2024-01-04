import { API_URL } from '../../config';

export const makeTraffic = (content, callback) => async dispatch => {
    const body = JSON.stringify({ content });

    try {
        const res = await fetch(`${API_URL}/api/traffic`, {
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
