import {
    LOAD_WORLDCUP_FAIL,
    LOAD_WORLDCUP_SUCCESS,
} from '../actions/worldcup/types'

const initialState = {
    worldcup: null,
};

const worldcupReducer = (state= initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case LOAD_WORLDCUP_SUCCESS:
            return {
                ...state,
                worldcup: payload
            }
        case LOAD_WORLDCUP_FAIL:
            return {
                ...state,
                worldcup: null
            }
        default:
            return state;
    };
}

export default worldcupReducer;