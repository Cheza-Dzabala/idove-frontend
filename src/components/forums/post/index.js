import React, { useState, useEffect } from 'react';
import Axios from '../../../helpers/Axios';
import { headers } from '../../../helpers/AuthHelpers';
import { useHistory } from "react-router-dom";
import Article from './components/article';
import Reactions from './components/reactions';
import CommentForm from './components/commentForm';
import CommentList from './components/comments';

import Snackbar from '../../feedback/Snackbar';
import Backdrop from '../../feedback/Backdrop';


export default (props) => {
    const forumSlug = props.location.pathname.split("/")[2];
    const topicSlug = props.location.pathname.split("/")[3];
    const postSlug = props.location.pathname.split("/")[4];
    const uri = `/api/forums/${forumSlug}/${topicSlug}/${postSlug}`;

    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState({});
    const [published, setPublished] = useState('');
    const [comments, setComments] = useState([]);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');

    const history = useHistory();

    const getPost = () => {
        Axios.get(uri, { headers })
            .then(response => {
                setPost(response.data.data.post);
                setTitle(response.data.data.title);
                setAuthor(response.data.data.author);
                setPublished(response.data.data.published);
                setComments(response.data.data.comments)
                setBackdropOpen(false);
            }).catch(error => {
                setBackdropOpen(false);
                setSnackBarOpen(true)
                setSnackBarMessage('Something went wrong, please reload')
                setSnackBarSeverity('error')
            })
    }

    useEffect(() => {
        setBackdropOpen(true);
        getPost();
    }, []);


    return (
        <div>
            <div class="ui-block">
                {!backdropOpen ?
                    <>
                        <Article
                            post={post} author={author}
                            published={published}
                            title={title} comment_length={comments.length}
                        />
                        <Reactions />
                        <div style={{ margin: '20px 0' }}>
                            <CommentList comments={comments} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <CommentForm
                                setSnackBarMessage={setSnackBarMessage}
                                setSnackBarOpen={setSnackBarOpen}
                                setSnackBarSeverity={setSnackBarSeverity}
                                getPost={getPost} uri={uri} />
                        </div>
                    </>
                    : ''
                }
                <Backdrop open={backdropOpen} />
                <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
            </div>
        </div>
    );
}