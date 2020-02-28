import React, { useState, useEffect } from 'react';
import Axios from '../../../helpers/Axios';
import { headers } from '../../../helpers/AuthHelpers';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Table from './components/table';
import Snackbar from '../../feedback/Snackbar';
import Backdrop from '../../feedback/Backdrop';
import NewTopicDialog from './dialogs/newTopicDialog';

export default (props) => {
    const history = useHistory();
    const slug = props.location.pathname.split("/")[2];
    const uri = `/api/forums/${slug}`;
    const [topics, setTopics] = useState([]);
    const [forum, setForum] = useState({});
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newTopic, setNewTopic] = useState({});

    const getTopics = () => {
        Axios.get(uri, { headers })
            .then(response => {
                setForum(response.data.forum)
                setTopics(response.data.data);
                setBackdropOpen(false);
            }).catch(error => {
                setBackdropOpen(false);
                setSnackBarMessage('Something went wrong, please reload the page')
                setSnackBarSeverity('error')
                setSnackBarOpen(true)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const _newTopic = newTopic;
        _newTopic[name] = value;
        setNewTopic(_newTopic);
    }

    const saveTopic = (e) => {
        e.preventDefault();
        setSnackBarMessage('Attaching your topic')
        setSnackBarSeverity('info')
        setSnackBarOpen(true)
        Axios.post(uri, newTopic, { headers })
            .then(response => {
                setSnackBarMessage('Successfully attached your topic')
                setSnackBarSeverity('success')
                setSnackBarOpen(true)
                setDialogOpen(false)
                getTopics();
            }).catch(error => {
                setSnackBarMessage('Something went wrong, please reload the page')
                setSnackBarSeverity('error')
                setDialogOpen(false)
                setSnackBarOpen(true)
            });
    }
    useEffect(() => {
        setBackdropOpen(true);
        getTopics();
    }, [])


    return (
        <div className="container">
            <div className="row">
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="ui-block responsive-flex">
                        <div className="ui-block-title">
                            <div className="h6 title">
                                {forum.title ? `${forum.title} Topics` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'right', margin: '10px 0' }}>
                <Button variant="contained" color="primary" disableElevation onClick={() => setDialogOpen(true)}>
                    Attach A Topic
                </Button>
            </div>
            {
                topics.length > 0 ? (
                    <div className="row" style={{ margin: '10px 0 20px 0' }}>
                        <Table topics={topics} forum={forum} />
                    </div>
                ) : <h2>No Topics Listed in this Forum</h2>
            }
            <NewTopicDialog open={dialogOpen} setOpen={setDialogOpen} saveTopic={saveTopic} handleChange={handleChange} />
            <Backdrop open={backdropOpen} />
            <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
        </div>
    );
}