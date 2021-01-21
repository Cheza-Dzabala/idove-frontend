import React, { useEffect, useState } from 'react';
import ForumIndex from './forum/index';
import TopicIndex from './topics/index';
import PostsIndex from './posts/index';
import PostIndex from './post/index';
import NewPost from './post/newPost';
import { Route } from 'react-router-dom';

export default () => {

    return (
        <div className="container">
            <Route exact path="/forums" component={ForumIndex} />
            <Route exact path="/forums/:forum" component={TopicIndex} />
            <Route exact path="/forums/:forum/:topic/new/post" component={NewPost} />
            <Route exact path="/forums/:forum/:topic" component={PostsIndex} />
            <Route exact path="/forums/:forum/:topic/:post" component={PostIndex} />
        </div >
    );
}