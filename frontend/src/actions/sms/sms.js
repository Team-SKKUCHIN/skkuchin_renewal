import { API_URL } from '../../config';
import {
    ENROLL_PHONE_SUCCESS,
    ENROLL_PHONE_FAIL,
    VERIFY_PHONE_SUCCESS,
    VERIFY_PHONE_FAIL
} from './types'

export const enroll_phone = async (data, callback) => {
    const body = JSON.stringify({
        ...data
    })
    try {
        const res = await fetch(`${API_URL}/api/sms`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
}

export const verify_phone = async (data, callback) => {
    const body = JSON.stringify({
        ...data
    })
    try {
        const res = await fetch(`${API_URL}/api/sms/verify`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        if (callback) callback([false, error]);
    }    
}