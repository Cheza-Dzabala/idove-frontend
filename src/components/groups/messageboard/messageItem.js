import React from 'react';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default ({message}) => {
    return (
        <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
        <div className="newsfeed-items-grid">
        <div className="ui-block">
            <article className="hentry post">
                <div className="post__author author vcard inline-items">
                    <img src={message.author.avatar} alt="author" />
                    <div className="author-date">
                        <a className="h6 post__author-name fn" href="#">{message.author.full_name}</a>
                        <div className="post__date">
                            <time className="published" dateTime="2004-07-24T18:18">
                                9 hours ago
                            </time>
                        </div>
                    </div>
                    <div className="more"><svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                        <ul className="more-dropdown">
                            <li>
                                <a href="#">Edit Post</a>
                            </li>
                            <li>
                                <a href="#">Delete Post</a>
                            </li>
                            <li>
                                <a href="#">Turn Off Notifications</a>
                            </li>
                            <li>
                                <a href="#">Select as Featured</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <p>
                    {message.message}
                </p>
                <div className="post-additional-info inline-items">
                    <a href="#" className="post-add-icon inline-items">
                        <svg className="olymp-heart-icon"><use href="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                        <span>{message.like_count}</span>
                    </a>
                    <ul className="friends-harmonic">   
                    <AvatarGroup max={5}>
                        {
                            message.likes.map(like =>  <Avatar src={like.user.avatar} style={{ width: '20px', height: '20px' }}></Avatar>)
                        }
                    </AvatarGroup>
                    </ul>
                    <div className="names-people-likes">
                        {/* <a href="#">You</a>, <a href="#">Elaine</a> and
                        <br /> */}
                        { message.like_count } {message.like_count === 1 ? 'person' : 'people'} liked this
                    </div>
                    <div className="comments-shared">
                        <a href="#" className="post-add-icon inline-items">
                            <svg className="olymp-speech-balloon-icon"><use href="/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                          <span>{message.comment_count}</span>
                        </a>
                    </div>
                </div>
                <div className="control-block-button post-control-button">
                    <a href="#" className="btn btn-control">
                        <svg className="olymp-like-post-icon"><use href="/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
                    </a>
                    <a href="#" className="btn btn-control">
                        <svg className="olymp-comments-post-icon"><use href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                    </a>
                    <a href="#" className="btn btn-control">
                        <svg className="olymp-share-icon"><use href="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                    </a>
                </div>
            </article>
            <ul className="comments-list">
                {
                    message.comments.map(comment => (
                        <li className="comment-item">
                            <div className="post__author author vcard inline-items">
                                <img src={comment.author.avatar} alt="author" />
                                <div className="author-date">
                                    <a className="h6 post__author-name fn" href="02-ProfilePage.html">{comment.author.full_name}</a>
                                    <div className="post__date">
                                        <time className="published" dateTime="2004-07-24T18:18">
                                            {comment.posted_on}
                                        </time>
                                    </div>
                                </div>
                                <a href="#" className="more"><svg className="olymp-three-dots-icon"><use href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                            </div>
                            <p>{comment.text}</p>
                            <a href="#" className="post-add-icon inline-items">
                                <svg className="olymp-heart-icon"><use href="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                                <span>{comment.likes}</span>
                            </a>
                            {/* <a href="#" className="reply">Reply</a> */}
                        </li>
                    ))
                }
            </ul>
            <a href="#" className="more-comments">View more comments <span>+</span></a>
            <form className="comment-form inline-items">
                <div className="post__author author vcard inline-items">
                    <img src="img/author-page.jpg" alt="author" />
                    <div className="form-group with-icon-right is-empty">
                        <textarea className="form-control" placeholder=""></textarea>
                        <div className="add-options-message">
                            <a href="#" className="options-message" data-toggle="modal" data-target="#update-header-photo">
                                <svg className="olymp-camera-icon">
                                    <use href="/svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
                                </svg>
                            </a>
                        </div>
                    <span className="material-input"></span></div>
                </div>
                <button className="btn btn-md-2 btn-primary">Post Comment</button>
            </form>
            </div>
        </div>
    </main>
    );
}