import React, { useContext } from 'react';
import FriendItem from './FriendItem';
import { UserContext } from '../context/userContext';

export default () => {
    const { users } = useContext(UserContext);
    return (
        <div className="container">
            <div className="row">
                {
                    users.length > 0 ?
                        users.map(user => user.profile ? <FriendItem user={user} key={user.id} /> : '')
                        : 'No Users'
                }
            </div>
        </div>
    );
}