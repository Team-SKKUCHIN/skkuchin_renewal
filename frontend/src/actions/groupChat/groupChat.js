import {
    GET_GROUP_CHAT_REQUEST_SUCCESS,
    GET_GROUP_CHAT_REQUEST_FAIL,
    REQUEST_GROUP_CHAT_SUCCESS,
    REQUEST_GROUP_CHAT_FAIL,
    REPLY_GROUP_CHAT_REQUEST_SUCCESS,
    REPLY_GROUP_CHAT_REQUEST_FAIL,
} from './type';
import { getToken, request_refresh } from '../auth/auth';
import { API_URL } from '../../config';

export const request_group_chat = (link, senderId, receiverId, callback) => async (dispatch) => {
    try {
        await dispatch(request_refresh());
        const access = await dispatch(getToken('access'));

        const body = JSON.stringify({link: link, sender_id : senderId, receiver_id : receiverId});
        
        const res = await fetch(`${API_URL}/api/group-chat-request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: REQUEST_GROUP_CHAT_SUCCESS
            });
            if(callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: REQUEST_GROUP_CHAT_FAIL
            });
        }
    }

    catch (error) {
        console.log(error);
        dispatch({
            type: REQUEST_GROUP_CHAT_FAIL
        });
    }
}