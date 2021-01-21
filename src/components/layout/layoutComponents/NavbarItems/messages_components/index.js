import React, { useContext } from 'react';
import { RealtimeContext } from './../../../../../contexts/RealtimeContext';

export default () => {
    const { allUsers, chats } = useContext(RealtimeContext);

    return (
        <>
            <div className="row">
                <span>Users / Groups</span>
            </div>
            <div className="container" style={{ width: '70vw', backgroundColor: '#fff', margin: '30px 0' }}>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ backgroundColor: '#0000', flexGrow: 3 }}>
                        <div style={{ display: 'flex' }}>
                            <img src="img/avatar54-sm.jp" alt="avatar" />
                            <p style={{ margin: '0 5px' }}>UserName</p>
                        </div>
                    </div>
                    <div style={{ flexGrow: 4 }}>Message Box</div>
                </div>
            </div>
        </>
    );
}