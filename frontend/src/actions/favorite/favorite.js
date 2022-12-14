import { 
    LOAD_FAV_SUCCESS,
    LOAD_FAV_FAIL,
    ENROLL_FAV_SUCCESS,
    ENROLL_FAV_FAIL,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_FAIL,
} 
    from './types';


// load FAV
export const load_favorite = () => async dispatch => {
    try {
        const res = await fetch('/api/favorite',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_FAV_SUCCESS,
                payload: data
            });
        }else {
            dispatch({
                type: LOAD_FAV_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: LOAD_FAV_FAIL
        });
    }
}


// enroll fav
export const enroll_favorite = (place_id) => async dispatch => {
    const body = JSON.stringify({
        place_id
    });

    try {
        const res = await fetch('/api/favorite', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 201) {
            dispatch({
                type: ENROLL_FAV_SUCCESS
            });
            dispatch(load_favorite());
        } else {
            dispatch({
                type: ENROLL_FAV_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: ENROLL_FAV_FAIL
        });
    }
};

// del fav
export const delete_favorite = (favorite_id) => async dispatch => {

    const body = JSON.stringify({
        favorite_id
    });

    try {
        const res = await fetch(`/api/favorite/${favorite_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 200) {
            dispatch({
                type: DELETE_FAV_SUCCESS
            });
            dispatch(load_favorite());
        } else {
            dispatch({
                type: DELETE_FAV_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: DELETE_FAV_FAIL
        });
    }
};

