import React, { useEffect, useState } from 'react';
import All from './all';
import Group from './showGroup';
import { Route } from 'react-router-dom';

export default () => {

    return (
        <div className="container">
            <Route exact path="/groups" component={All} />
            <Route exact path="/groups/:group" component={Group} />
        </div >
    );
}