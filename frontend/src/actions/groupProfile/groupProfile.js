import { API_URL } from "../../config";
import { getToken, request_refresh } from "../auth/auth";
import {
    GET_MY_GROUP_PROFILE_SUCCESS,
    GET_MY_GROUP_PROFILE_FAIL,
    ADD_GROUP_PROFILE_SUCCESS,
    ADD_GROUP_PROFILE_FAIL,
    LOAD_ALL_GROUP_PROFILE_SUCCESS,
    LOAD_ALL_GROUP_PROFILE_FAIL,
    LOAD_CANDIDATE_PROFILE_SUCCESS,
    LOAD_CANDIDATE_PROFILE_FAIL,
    CHANGE_GROUP_PROFILE_SUCCESS,
    CHANGE_GROUP_PROFILE_FAIL,
    DELETE_GROUP_PROFILE_SUCCESS,
    DELETE_GROUP_PROFILE_FAIL,
    CLEAR_CANDIDATE_PROFILE
} from "./types";

export const get_random_nickname = () => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/group-profile/random-name`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();
        console.log('랜덤 닉네임 조회 요청 완료 :', apiRes.data);

        if (res.status === 200) {
            return apiRes.data;
        } else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export const check_group_name_duplicate = async (groupName) => {
    try {
        const res = await fetch(`${API_URL}/api/group-profile/check/group-name`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ group_name: groupName })
        });

        const apiRes = await res.json();
        if(res.status === 200) {
            return apiRes.data;
        } else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

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

export const add_group_profile = (profileData, callback) => async dispatch => {
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
            })
            dispatch(get_my_group_profile());
            dispatch(load_all_group_profile(true));
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

export const load_candidate_profile = (id, callback) => async dispatch => {
    try {
        const res = await fetch(`${API_URL}/api/group-profile/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_CANDIDATE_PROFILE_SUCCESS,
                payload: apiRes.data
            });
            if(callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_CANDIDATE_PROFILE_FAIL
            });
        }
    }

    catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_CANDIDATE_PROFILE_FAIL
        });
    }
}

export const load_all_group_profile = (isAuthenticated) => async (dispatch) => {
    try {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        
        if (isAuthenticated) {
            const access = await dispatch(getToken('access'));
            headers['Authorization'] = `Bearer ${access}`;
        }

        console.log('그룹 프로필 전체 조회 요청, 로그인 여부: ', isAuthenticated);
        console.log('헤더: ', headers);

        const res = await fetch(`${API_URL}/api/group-profile`, {
            method: 'GET',
            headers: headers
        });

        const apiRes = await res.json();

        if(res.status === 200) {
            dispatch({
                type: LOAD_ALL_GROUP_PROFILE_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: LOAD_ALL_GROUP_PROFILE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_ALL_GROUP_PROFILE_FAIL
        });
    }
}


export const update_group_profile = (profileId, updatedData, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    console.log(access)

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
            });
            if (callback) callback([true, apiRes.message]);
            dispatch(get_my_group_profile());
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

export const delete_group_profile = (profileId, reason, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));
    
    const body = JSON.stringify({reason});
    try {
        const res = await fetch(`${API_URL}/api/group-profile/${profileId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });
        
        const apiRes = await res.json();
        console.log(res.status, apiRes);
        if (res.status === 200) {
            dispatch({
                type: DELETE_GROUP_PROFILE_SUCCESS,
            });
            dispatch(get_my_group_profile());
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: DELETE_GROUP_PROFILE_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_GROUP_PROFILE_FAIL
        });
    }
}

export const clear_candidate_profile = () => dispatch => {
    dispatch({
        type: CLEAR_CANDIDATE_PROFILE
    });
}