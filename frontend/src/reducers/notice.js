import { LOGOUT_SUCCESS } from '../actions/auth/types';
import{
    LOAD_NOTICE_FAIL,
    LOAD_NOTICE_SUCCESS,
} from '../actions/notice/types'

const initialState = {
    notice: null,
}

const noticeReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type){
        case LOAD_NOTICE_SUCCESS:
            return{
                ...state,
                notice: payload
            }
        case LOAD_NOTICE_FAIL:
            return{
                ...state,
                notice: null
            }
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default noticeReducer;