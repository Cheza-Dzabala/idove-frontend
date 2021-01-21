import React, {useState, useEffect} from 'react';
import Axios from '../../helpers/Axios';
import { headers } from '../../helpers/AuthHelpers';
import Snackbar from "../feedback/Snackbar";
import Backdrop from "../feedback/Backdrop";
import MessageBoard from './messageboard/messageItem';
import MemberList from './members/memberList';

export default (props) => {
    const groupId = props.location.pathname.split("/")[2];
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');
    const [members, setMembers] = useState([]);
    const [messageBoard, setMessageBoard] = useState([]);

    const handleError = () => {
        setSnackBarSeverity('error');
        setSnackBarMessage('Unable to load assets. Please reload the page');
        setSnackBarOpen(true);
        setBackdropOpen(false);
    };
    
    const getMessageBoard = () => {
        Axios.get(`api/groups/${groupId}/messages`, {headers})
        .then(response => {
            setMessageBoard(response.data.data);
            setBackdropOpen(false);
        }).catch(error => {
            console.log(error.response);
            handleError();
        });
    }

    const getMembers = () => {
        Axios.get(`api/groups/${groupId}/members`, {headers})
        .then(response => {
            setMembers(response.data.data);
            getMessageBoard();
        }).catch(error => {
            console.log(error.response);
            handleError();
        });
    }

    useEffect(() => {
        setBackdropOpen(true);
        getMembers();
    }, []);

    return (
        <>
            <div className="row">
                {
                    messageBoard.map(message => <MessageBoard message={message} />)
                }
                <MemberList members={members}/>
            </div>
            <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
            <Backdrop open={backdropOpen} />
        </>
    );
}