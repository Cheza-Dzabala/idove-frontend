import { GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from "../actions/types";


const initialState = () => ({
    status: '',
    data: {},
    data_error: {},
    http_status: 0
});


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_SUCCESS: {
            return {
                ...state,
                status: 'success',
                data: action.payload,
                http_status: action.http_status
            }
        }
        case GET_USER_PROFILE_ERROR: {
            return {
                ...state,
                status: 'error',
                data: action.payload,
                http_status: action.http_status
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
