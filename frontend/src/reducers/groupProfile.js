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
} from '../actions/groupProfile/types';

const initialState = {
    myGroupProfiles: null,
    allGroupProfiles: null
};

const groupProfileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case GET_MY_GROUP_PROFILE_SUCCESS:
            return {
                ...state,
                myGroupProfiles: payload
            }
        case GET_MY_GROUP_PROFILE_FAIL:
            return {
                ...state,
                myGroupProfiles: null
            }
        case ADD_GROUP_PROFILE_SUCCESS:
            return {
                ...state,
                myGroupProfiles: payload
            }
        case ADD_GROUP_PROFILE_FAIL:
            return {
                ...state
            }
        case LOAD_GROUP_PROFILE_SUCCESS:
            return {
                ...state,
                allGroupProfiles: payload
            }
        case LOAD_GROUP_PROFILE_FAIL:
            return {
                ...state,
                allGroupProfiles: null
            }
        case CHANGE_GROUP_PROFILE_SUCCESS:
            return {
                ...state,
                myGroupProfiles: payload
            }
        case CHANGE_GROUP_PROFILE_FAIL:
            return {
                ...state
            }
        case DELETE_GROUP_PROFILE_SUCCESS:
            return {
                ...state,
                myGroupProfiles: payload
            }
        case DELETE_GROUP_PROFILE_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
}

export default groupProfileReducer;