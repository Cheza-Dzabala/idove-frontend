import Axios from "../../helpers/Axios";
import {headers} from "../../helpers/AuthHelpers";


export const getNewsfeed = (setBackdropOpen, setFeed, setSnackBarSeverity, setSnackBarMessage, setSnackBarOpen) => {
    Axios.get("api/newsfeed", {headers})
        .then((response) => {
            setBackdropOpen(false);
            setFeed(response.data.data);
        })
        .catch((error) => {
            setBackdropOpen(false);
            setSnackBarSeverity("error");
            setSnackBarMessage("Unable to get newsfeed");
            setSnackBarOpen(true);
        });
};