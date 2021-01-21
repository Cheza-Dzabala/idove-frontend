import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Axios from '../../../helpers/Axios';
import { headers } from '../../../helpers/AuthHelpers';
import SeachBar from './components/searchBar';
import Table from './components/table';
import NewForumDialog from './../dialogs/newForumDialog';
import Snackbar from '../../feedback/Snackbar';
import Backdrop from '../../feedback/Backdrop';


export default () => {
    const [forums, setForums] = useState([]);
    const [forum, setForum] = useState({});
    const [open, setOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');

    const getForums = () => {
        Axios.get('/api/forums', { headers })
            .then(response => {
                setForums(response.data.data);
                setBackdropOpen(false);
            }).catch(error => {
                console.log('error::', error)
                setBackdropOpen(false);
                setSnackBarMessage('Something went wrong, please reload the page')
                setSnackBarSeverity('error')
                setSnackBarOpen(true)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const _forumCopy = forum;
        _forumCopy[name] = value;
        setForum(_forumCopy);
    }

    const saveForum = (e) => {
        e.preventDefault();
        setSnackBarMessage('Creating your forum');
        setSnackBarSeverity('info');
        setSnackBarOpen(true);
        Axios.post('api/forums',
            forum,
            { headers })
            .then(response => {
                setSnackBarMessage('Successfully created forum');
                setSnackBarSeverity('success');
                setSnackBarOpen(true);
                getForums();
                setOpen(false);
            }).catch(error => {
                setSnackBarMessage('Unable to create your forum');
                setSnackBarSeverity('error');
                setSnackBarOpen(true);
                console.log(error.response)
            });
    }

    useEffect(() => {
        setBackdropOpen(true);
        getForums();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <SeachBar />
            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'right', margin: '10px 0' }}>
                <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(true)}>
                    Create Forum
                </Button>
            </div>
            <div className="row" style={{ margin: '10px 0 20px 0' }}>
                <Table forums={forums} />
            </div>
            <div>
                <NewForumDialog open={open} setOpen={setOpen} saveForum={saveForum} handleChange={handleChange} />
            </div>
            <Backdrop open={backdropOpen} />
            <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
        </div >
    );
}