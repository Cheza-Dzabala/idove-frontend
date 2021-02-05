import { GET_PROFILE_SUCCESS, GET_PROFILE_ERROR, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR } from '../actions/types';

const initialState = () => ({
    status: '',
    data: {},
    data_error: {},
    http_status: 0
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: action.payload,
                http_status: action.http_status
            }
        case GET_PROFILE_ERROR:
            return {
                ...state,
                status: 'error',
                data_error: action.payload,
                http_status: action.http_status
            }
        case SAVE_PROFILE_SUCCESS:
            console.log('Save Profile Reducer', action);
            return {
                ...state,
                status: 'success',
                data: action.payload,
                http_status: action.http_status
            }
        case SAVE_PROFILE_ERROR:
            console.log('Save Profile Reducer Error', action);

            return {
                ...state,
                status: 'error',
                data_error: action.payload,
                http_status: action.http_status
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                status: 'success',
                data_error: action.payload,
                http_status: action.http_status
            }
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                status: 'error',
                data_error: action.payload,
                http_status: action.http_status
            }
        default:
            return state
    }
}

