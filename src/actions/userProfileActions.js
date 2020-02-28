import { getToken } from "../helpers/AuthHelpers"
import { GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from "./types";
import Axios from "../helpers/Axios";

const headers = {
    Authorization: `Bearer ${getToken()}`
}

export const getUserProfile = (slug) => dispatch => {
    Axios.get(`/api/profile/${slug}`, { headers })
        .then(response => {
            dispatch({
                type: GET_USER_PROFILE_SUCCESS,
                payload: response.data,
                http_status: response.status
            })
        })
        .catch(({ response }) => {
            dispatch({
                type: GET_USER_PROFILE_ERROR,
                payload: response.data,
                http_status: response.status
            })
        })
}