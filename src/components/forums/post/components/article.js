import React from 'react';
import { Link } from 'react-router-dom';


export default ({ post, author, published, title, comment_length }) => {

    return (
        <article className="hentry blog-post single-post single-post-v2">
            <a href="#" className="post-category bg-blue-light">Edit</a>
            <h2 className="h1 post-title">{title}</h2>
            <div className="single-post-additional inline-items">
                <div className="post__author author vcard inline-items">
                    <img alt="author" src={`${author.avatar}`} className="avatar" />
                    <div className="author-date not-uppercase">
                        <div className="author_prof">
                            Author
                        </div>
                        <Link className="h6 post__author-name fn" to={`/profiles/${author.slug}`}>{author.full_name}</Link>
                    </div>
                </div>
                <div className="post-date-wrap inline-items">
                    <svg className="olymp-calendar-icon">
                        <use href="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use>
                    </svg>
                    <div className="post-date">
                        <a className="h6 date" href="#">{published}</a>
                        <span>Date</span>
                    </div>
                </div>
                <div className="post-comments-wrap inline-items">
                    <svg className="olymp-comments-post-icon">
                        <use href="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
                    </svg>
                    <div className="post-comments">
                        <a className="h6 comments" href="#">{comment_length}</a>
                        <span>Comments</span>
                    </div>
                </div>

                <div className="post-comments-wrap inline-items">
                    <svg className="olymp-comments-post-icon">
                        <use href="#olymp-comments-post-icon"></use>
                    </svg>
                    <div className="post-comments">
                        <a className="h6 comments" href="#">14</a>
                        <span>Likes</span>
                    </div>
                </div>

            </div>


            <div className="post-content-wrap">
                <div className="post-content">
                    <h5 className="weight-normal"></h5>
                    <p dangerouslySetInnerHTML={{ __html: post }} />
                </div>
            </div>


        </article>

    );
}