import { API_URL } from "../../config";
import { getToken, request_refresh } from "../auth/auth";
import {
    GET_MY_GROUP_PROFILE_SUCCESS,
    GET_MY_GROUP_PROFILE_FAIL,
    ADD_GROUP_PROFILE_SUCCESS,
    ADD_GROUP_PROFILE_FAIL,
    LOAD_GROUP_PROFILE_SUCCESS,
    LOAD_GROUP_PROFILE_FAIL,
    CHANGE_GROUP_PROFILE_SUCCESS,
    CHANGE_GROUP_PROFILE_FAIL,
    DELETE_GROUP_PROFILE_SUCCESS,
    DELETE_GROUP_PROFILE_FAIL,
} from "./types";

export const get_my_group_profile = () => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/group-profile/mine`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();
        console.log('내 그룹 프로필 조회 요청 완료 :', apiRes.data);

        if (res.status === 200) {
            dispatch({
                type: GET_MY_GROUP_PROFILE_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: GET_MY_GROUP_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_MY_GROUP_PROFILE_FAIL
        });
    }
}

export const add_group_profile = (profileData) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify(profileData);

    console.log('그룹 프로필 등록 요청!: ', body);
    try {
        const res = await fetch(`${API_URL}/api/group-profile`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();
        console.log('그룹 프로필 등록 요청 완료: ', apiRes);

        if(res.status === 201){
            dispatch({
                type: ADD_GROUP_PROFILE_SUCCESS,
                payload: apiRes
            })

            if(callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: ADD_GROUP_PROFILE_FAIL
            })

            if(callback) callback([false, apiRes.message]);
        }

    }
    catch (error) {
        console.log(error);
        dispatch({
            type: ADD_GROUP_PROFILE_FAIL
        })
    }
}

export const load_group_profile = (isAuthenticated) => async dispatch => {
    try {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if(isAuthenticated) {
            await dispatch(request_refresh());
            const access = await dispatch(getToken('access'));
            headers['Authorization'] = `Bearer ${access}`;
        }

        const res = await fetch(`${API_URL}/api/group-profile`, {
            method: 'GET',
            headers: headers
        });

        const apiRes = await res.json();
        console.log('그룹 프로필 목록 조회 요청 완료 :', apiRes.data);

        if (res.status === 200) {
            dispatch({
                type: LOAD_GROUP_PROFILE_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: LOAD_GROUP_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_GROUP_PROFILE_FAIL
        });
    }
}

export const update_group_profile = (profileId, updatedData) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify(updatedData);

    try {
        const res = await fetch(`${API_URL}/api/group-profile/${profileId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();
        console.log(`그룹 프로필(${profileId}) 수정 요청 완료 :`, apiRes);

        if (res.status === 200) {
            dispatch({
                type: CHANGE_GROUP_PROFILE_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: CHANGE_GROUP_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_GROUP_PROFILE_FAIL
        });
    }
}

export const delete_group_profile = (profileId) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/group-profile/${profileId}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();
        console.log(`그룹 프로필(${profileId}) 삭제 요청 완료 :`, apiRes);

        if (res.status === 200) {
            dispatch({
                type: DELETE_GROUP_PROFILE_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: DELETE_GROUP_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_GROUP_PROFILE_FAIL
        });
    }
}
