import Axios from '../helpers/Axios';
import { headers } from '../helpers/AuthHelpers';
import { GET_PROFILE_ERROR, GET_PROFILE_SUCCESS, SAVE_PROFILE_ERROR, SAVE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_SUCCESS } from './types';


export const updateProfile = (data, slug) => dispatch => {
    Axios.patch(`/api/profile/${slug}`, data, { headers })
        .then(response => {
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response.data,
                http_status: response.status
            })
        })
        .catch(({ response }) => {
            console.log(response);
            dispatch({
                type: UPDATE_PROFILE_ERROR,
                payload: response.data,
                http_status: response.status
            })
        });
}

export const saveProfile = (data) => (dispatch) => {
    Axios.post('/api/profile', data, { headers })
        .then(response => {
            console.log('Save Profile Actions: ', response.data);
            dispatch({
                type: SAVE_PROFILE_SUCCESS,
                payload: response.data,
                http_status: response.status
            })
        })
        .catch(({ response }) => {
            console.log('Save Profile Actions Error: ', response);
            dispatch({
                type: SAVE_PROFILE_ERROR,
                payload: response.data,
                http_status: response.status
            })
        });
}

export const getProfile = () => (dispatch) => {
    Axios.get('/api/profile', { headers })
        .then(response => {
            console.log('Action', response)
            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: response.data,
                http_status: response.status
            });
        })
        .catch(({ response }) => {
            console.log('Actions:', response.data)
            dispatch({
                type: GET_PROFILE_ERROR,
                payload: response.data,
                http_status: response.status
            })
        })
}