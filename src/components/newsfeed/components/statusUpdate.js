import React, { useState } from 'react';
import Axios from '../../../helpers/Axios';
import { headers, userData } from '../../../helpers/AuthHelpers';
import { Avatar } from '@material-ui/core';

export default ({ setSnackBarMessage, setSnackBarOpen, setSnackBarSeverity, setUpdating, updating, getNewsfeed }) => {
    const [status, setStatus] = useState({});
    const [statusText, setStatusText] = useState('');
    const profile = userData();
    const updateStatus = (e) => {
        e.preventDefault();
        setSnackBarMessage('Updating your status....')
        setUpdating(true);
        setSnackBarOpen(true)

        Axios.post('api/status/update', status, { headers })
            .then(res => {
                console.log(res);
                setSnackBarOpen(false)
                setSnackBarSeverity('success')
                setSnackBarMessage('Updated your status')
                setSnackBarOpen(true)
                setUpdating(false);
                getNewsfeed();
                setStatusText('')
            }).catch(err => {
                console.log(err);
                setSnackBarOpen(false)
                setSnackBarSeverity('error')
                setSnackBarMessage('Unable to update status')
                setSnackBarOpen(true)
                setUpdating(false);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStatusText(value);
        const _statusCopy = status;
        _statusCopy[name] = value;
        setStatus(_statusCopy);
    }


    return (
        <div className="ui-block">
            <div className="news-feed-form">
                <form onSubmit={updateStatus}>
                    <div className="author-thumb">
                        <Avatar src={profile.avatar} alt={profile.slug} />
                    </div>
                    <div className="form-group with-icon label-floating is-empty">
                        <label className="control-label">Share what you are thinking here...</label>
                        <textarea className="form-control" placeholder="" onChange={handleChange} name="update" required value={statusText}></textarea>
                        <span className="material-input"></span></div>
                    <div className="add-options-message">
                        <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="ADD PHOTOS">
                            <svg className="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo"><use href="#olymp-camera-icon"></use></svg>
                        </a>
                        <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="TAG YOUR FRIENDS">
                            <svg className="olymp-computer-icon"><use href="#olymp-computer-icon"></use></svg>
                        </a>
                        <a href="#" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="ADD LOCATION">
                            <svg className="olymp-small-pin-icon"><use href="#olymp-small-pin-icon"></use></svg>
                        </a>
                        <button className="btn btn-primary btn-md-2" disabled={updating}>Post Update</button>
                        {/* <button className="btn btn-md-2 btn-border-think btn-transparent c-grey">Preview</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}