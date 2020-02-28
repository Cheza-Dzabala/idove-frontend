import React, { useState, useEffect } from 'react';
import Axios from '../../../helpers/Axios';
import { headers } from '../../../helpers/AuthHelpers';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Table from './components/table';
import Backdrop from '../../feedback/Backdrop';
import Snackbar from '../../feedback/Snackbar';

export default (props) => {
    const history = useHistory();
    const forumSlug = props.location.pathname.split("/")[2];
    const topicSlug = props.location.pathname.split("/")[3];
    const [posts, setPosts] = useState([]);
    const [topic, setTopic] = useState({});
    const [forum, setForum] = useState({});
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');

    const getTopics = () => {
        Axios.get(`/api/forums/${forumSlug}/${topicSlug}`, { headers })
            .then(response => {
                setTopic(response.data.topic)
                setForum(response.data.forum)
                setPosts(response.data.data);
                setBackdropOpen(false);
            }).catch(error => {
                setBackdropOpen(false);
                setSnackBarOpen(true)
                setSnackBarMessage('Something went wrong, please reload')
                setSnackBarSeverity('error')
                console.log('error::', error)
            })
    }

    useEffect(() => {
        setBackdropOpen(true);
        getTopics();
    }, [])

    const handleClick = (path) => {
        history.pushState({}, '', path);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="ui-block responsive-flex">
                        <div className="ui-block-title">
                            <div className="h6 title">
                                {topic.title ? `${topic.title}` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ display: 'flex', justifyContent: 'right', margin: '10px 0' }}>
                <Button variant="contained" color="primary" disableElevation >
                    <Link to={`${topicSlug}/new/post`} style={{ color: '#fff' }}>Post to this Topic</Link>
                </Button>
            </div>
            <div className="row" style={{ margin: '10px 0 20px 0' }}>
                <Table posts={posts} topic={topic} forum={forum} />
            </div>
            <Backdrop open={backdropOpen} />
            <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
        </div>
    );
}