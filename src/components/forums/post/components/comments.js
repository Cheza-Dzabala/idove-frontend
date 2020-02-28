import React from 'react';


export default ({ comments }) => {
    return (
        <>
            <div className="row">
                <div className="col col-xl-8 m-auto col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="crumina-module crumina-heading with-title-decoration">
                        <h5 className="heading-title">Comments ({comments.length})</h5>
                    </div>
                    <ul className="comments-list style-3">
                        {
                            comments.map(comment => (
                                <li className="comment-item">
                                    <div className="post__author-thumb">
                                        <img src={`${comment.author.avatar}`} alt={`${comment.author.full_name}-avatar`} />
                                    </div>
                                    <div className="comments-content">
                                        <div className="post__author author vcard">
                                            <div className="author-date">
                                                <a className="h6 post__author-name fn" href="#">{comment.author.full_name}</a>
                                                <div className="post__date">
                                                    <time className="published" dateTime="2004-07-24T18:18">
                                                        {comment.posted_on}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>
                                        <p>{comment.text}</p>
                                        <a href="#" className="reply">Like</a>
                                        <a href="#" className="report">Report</a>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </div>
        </>
    );
}