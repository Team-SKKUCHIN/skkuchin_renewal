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
    CLEAR_CANDIDATE_PROFILE,
} from '../actions/groupProfile/types';

const initialState = {
    myGroupProfiles: null,
    candidateGroup: null,
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
        case ADD_GROUP_PROFILE_FAIL:
            return {
                ...state
            }
        case LOAD_ALL_GROUP_PROFILE_SUCCESS:
            return {
                ...state,
                allGroupProfiles: payload
            }
        case LOAD_ALL_GROUP_PROFILE_FAIL:
            return {
                ...state,
                allGroupProfiles: null
            }
        case LOAD_CANDIDATE_PROFILE_SUCCESS:
            return {
                ...state,
                candidateGroup: payload
            }
        case LOAD_CANDIDATE_PROFILE_FAIL:
        case CLEAR_CANDIDATE_PROFILE:
            return {
                ...state,
                candidateGroup: null
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