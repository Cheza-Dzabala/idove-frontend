import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import { headers } from '../../helpers/AuthHelpers';
import Axios from '../../helpers/Axios';
import { UserContext } from './context/userContext'
import AllUsers from './components/AllUsers';

export default () => {
    const [immutableUserList, setImmutableUserList] = useState({});
    const [users, setUsers] = useState({});
    const [setError] = useState('');


    const filterUsers = (term) => {
        if (term === '') {
            setUsers(immutableUserList);
        } else {
            const filtered = immutableUserList.filter(user => (user.first_name.search(term) !== -1) ? user : '');
            setUsers(filtered)
        }
    }

    useEffect(() => {
        Axios.get('/api/users', { headers })
            .then(response => {
                setUsers(response.data.data);
                setImmutableUserList(response.data.data);
            })
            .catch(({ response }) => {
                setError(response.data);
            });
    }, [setError]);
    return (
        <>
            <UserContext.Provider value={{ users, filterUsers }}>
                <Filter />
                <AllUsers />
            </UserContext.Provider>
        </>
    );
}