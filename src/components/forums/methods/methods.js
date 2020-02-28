import Axios from "../../../helpers/Axios"
import { headers } from "../../../helpers/AuthHelpers";

export const getForums = (setForums) => {
    Axios.get('/api/forums', { headers })
        .then(data => {
            setForums(data.data);
        }).catch(error => {
            console.log('error')
        })
}