import Axios from "../helpers/Axios"
import { getToken } from "../helpers/AuthHelpers"
import { GET_QUESTIONNAIRES, GET_QUESTIONNAIRES_ERROR } from "./types";

const headers = {
    'Authorization': `Bearer ${getToken()}`
};

export const getQuestionnaires = () => dispatch => {
    Axios.get('/api/questionnaires', { headers })
        .then(response => {
            dispatch({
                'type': GET_QUESTIONNAIRES,
                'payload': response.data,
                'http_status': response.status
            });
        }).catch(response => {
            dispatch({
                'type': GET_QUESTIONNAIRES_ERROR,
                'payload': response.data,
                'http_status': response.status
            })
        })
}
