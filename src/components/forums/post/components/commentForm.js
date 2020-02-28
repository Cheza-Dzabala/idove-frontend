import React, { useState } from 'react';
import Axios from '../../../../helpers/Axios';
import { headers } from '../../../../helpers/AuthHelpers';


export default ({ getPost, uri, setSnackBarMessage, setSnackBarOpen, setSnackBarSeverity }) => {
    const [commentToSend, setCommentToSend] = useState({});

    const sendComment = (e) => {
        e.preventDefault();
        setSnackBarMessage('commenting...')
        setSnackBarSeverity('info')
        setSnackBarOpen(true)
        Axios.post(`${uri}/comment`, commentToSend, { headers })
            .then(response => {
                setSnackBarOpen(false)
                setSnackBarMessage('Successfully comment')
                setSnackBarSeverity('success')
                setSnackBarOpen(true)
                document.getElementById('comment_textarea').innerHTML = '';
                getPost();
            }).catch(err => {
                setSnackBarOpen(false)
                setSnackBarMessage('Unable to post comment')
                setSnackBarSeverity('error')
                setSnackBarOpen(true)
                console.log(err.response);
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const _commentToSend = commentToSend;
        _commentToSend[name] = value;
        setCommentToSend(_commentToSend);
    }
    return (
        <form onSubmit={sendComment}>
            <div class="row">
                <div class="col col-xl-8 m-auto col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="crumina-module crumina-heading with-title-decoration">
                        <h5 class="heading-title">Write a Comment</h5>
                    </div>
                    <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="form-group is-empty">
                            <textarea class="form-control" placeholder="Your Comment" name="comment" id="comment_textarea" onChange={handleChange} required></textarea>
                            <span class="material-input"></span></div>
                        <button type="submit" href="#" class="btn btn-primary btn-lg full-width">Post your Comment</button>
                    </div>
                </div>
            </div>
        </form>
    );
}