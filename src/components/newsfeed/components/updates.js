import React, { useState } from 'react';
import { userData, userProfile, headers } from '../../../helpers/AuthHelpers';
import Axios from '../../../helpers/Axios';


export default ({
    updates, setSnackBarMessage,
    setSnackBarOpen, setSnackBarSeverity, getNewsfeed
}) => {
    console.log(updates);
    const [commentableId, setCommentableId] = useState(0);
    const [newComment, setNewComment] = useState({});
    const [commenting, setCommenting] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        const _newComment = newComment;
        _newComment[name] = value;
        setNewComment(_newComment);
    }


    const sendComment = (e) => {
        e.preventDefault();
        setSnackBarSeverity('info')
        setSnackBarMessage('Commenting..')
        setSnackBarOpen(true)
        Axios.post(`api/status/${commentableId}/comment`, newComment, { headers })
            .then(response => {
                setSnackBarSeverity('success')
                setSnackBarMessage('Commented')
                setSnackBarOpen(true);
                setCommenting(false);
                getNewsfeed();
            }).catch(error => {
                setSnackBarSeverity('error')
                setSnackBarMessage('Unable to comment')
                setSnackBarOpen(true)
                setCommenting(false);
            });
    }
    return (
        updates.map(update => (
            <div className="ui-block col-md-12 col-lg-12 col-xl-12 col-sm-12">
                <article className="hentry post">
                    <div className="post__author author vcard inline-items">
                        <img src={update.user.avatar} alt={update.user.full_name} />
                        <div className="author-date">
                            <a className="h6 post__author-name fn" href="#">{update.user.full_name}</a>
                            <div className="post__date">
                                <time className="published" datetime="2004-07-24T18:18">
                                    {update.posted}
                                </time>
                            </div>
                        </div>

                        <div className="more"><svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                            <ul className="more-dropdown">
                                {
                                    (update.user.id === userData().id) ?
                                        <>
                                            <li>
                                                <a href="#">Delete Post</a>
                                            </li>
                                            <li>
                                                <a href="#">Turn Off Notifications</a>
                                            </li>
                                            <li>
                                                <a href="#">Edit Post</a>
                                            </li>
                                        </>
                                        : ''
                                }
                                <li>
                                    <a href="#">Select as Featured</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>{update.update}</p>

                    <div className="post-additional-info inline-items">

                        <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-heart-icon"><use href="svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                            <span>{update.likes.length}</span>
                        </a>

                        {/* <ul className="friends-harmonic">
                            <li>
                                <a href="#">
                                    <img src="img/friend-harmonic7.jpg" alt="friend" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/friend-harmonic8.jpg" alt="friend" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/friend-harmonic9.jpg" alt="friend" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/friend-harmonic10.jpg" alt="friend" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="img/friend-harmonic11.jpg" alt="friend" />
                                </a>
                            </li>
                        </ul> */}

                        <div className="names-people-likes">

                            {/* <a href="#">You</a> and
                                 <br />22 more liked this */}
                        </div>
                        <div className="comments-shared">
                            <a href="#" className="post-add-icon inline-items">
                                <svg className="olymp-speech-balloon-icon"><use href="svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                                <span>{update.comments.length}</span>
                            </a>
                        </div>
                    </div>

                    {/* <div className="control-block-button post-control-button">

                        <a href="#" className="btn btn-control">
                            <svg className="olymp-like-post-icon"><use href="svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
                        </a>

                        <a href="#" className="btn btn-control">
                            <svg className="olymp-comments-post-icon"><use href="svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                        </a>

                        <a href="#" className="btn btn-control">
                            <svg className="olymp-share-icon"><use href="svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                        </a>

                    </div> */}

                </article>
                <ul className="comments-list">
                    {update.comments.map(comment => (
                        <li className="comment-item">
                            <div className="post__author author vcard inline-items">
                                <img src={comment.author.avatar} alt={comment.author.full_name} />

                                <div className="author-date">
                                    <a className="h6 post__author-name fn" href="02-ProfilePage.html">{comment.author.full_name}</a>
                                    <div className="post__date">
                                        <time className="published" datetime="2004-07-24T18:18">
                                            {comment.author.full_name}
                                        </time>
                                    </div>
                                </div>
                                <a href="#" className="more"><svg className="olymp-three-dots-icon"><use href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                            </div>
                            <p>{comment.text}</p>
                            <a href="#" className="post-add-icon inline-items">
                                <svg className="olymp-heart-icon"><use href="svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                                <span>{comment.likes}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                {/* <a href="#" className="more-comments">View more comments <span>+</span></a> */}
                <form className="comment-form inline-items">
                    <div className="post__author author vcard inline-items">
                        {/* <img src={userProfile().avatar} alt={userData().first_name} /> */}
                        <form style={{ width: '100%' }} onSubmit={sendComment}>
                            <div className="form-group with-icon-right is-empty">
                                <textarea className="form-control" placeholder="" name="comment" onChange={(e) => {
                                    const { name, value } = e.target;
                                    const _newComment = newComment;
                                    _newComment[name] = value;
                                    setCommentableId(update.id);
                                    setNewComment(_newComment);
                                }} required></textarea>
                                {/* <div className="add-options-message">
                                    <a href="#" className="options-message" data-toggle="modal" data-target="#update-header-photo">
                                        <svg className="olymp-camera-icon">
                                            <use href="svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
                                        </svg>
                                    </a>
                                </div> */}
                                <span className="material-input"></span></div>
                            <button className="btn btn-md-2 btn-primary" disabled={commenting}>Post Comment</button>
                        </form>
                    </div>
                </form>
            </div>

        ))
    );
}