import React, { useState } from 'react';
import { TrixEditor } from "react-trix";
import { TextField, Button } from '@material-ui/core';
import Axios from '../../../helpers/Axios';
import { headers } from '../../../helpers/AuthHelpers';
import Backdrop from '../../feedback/Backdrop';
import Snackbar from '../../feedback/Snackbar';


export default (props) => {
    const forumSlug = props.location.pathname.split("/")[2];
    const topicSlug = props.location.pathname.split("/")[3];
    const uri = `api/forums/${forumSlug}/${topicSlug}`;
    const [saving, setSaving] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');

    const [post, setPost] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const _post = post;
        _post[name] = value;
        setPost(_post);
    }

    const savePost = (e) => {
        e.preventDefault();
        setSnackBarMessage('Saving your post....')
        setSaving(true);
        setSnackBarOpen(true)
        Axios.post(uri, post, { headers })
            .then(response => {
                setSnackBarSeverity('success')
                setSnackBarMessage('Successfully saved your post')
                setSnackBarOpen(true)
                setSaving(false);
            }).catch(error => {
                setSnackBarSeverity('error')
                setSnackBarMessage('Unable to save your post')
                setSnackBarOpen(true)
                setSaving(false);
            });
    }

    return (
        <div className="container">
            <div className="ui-block" style={{ padding: '50px' }}>
                <h2>New Post</h2>
                <form onSubmit={savePost}>
                    <div className="row">
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ marginTop: '20px' }}>
                            <TextField
                                autoFocus
                                id="name"
                                label="Title"
                                variant="outlined"
                                name="title"
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ marginTop: '20px' }}>
                            <TrixEditor name="post" required className="form-control" style={{ border: '1px solid', minHeight: '350px' }} placeholder="Tell us something extremely interesting..."

                                onChange={(e) => {
                                    handleChange({ target: { name: 'post', value: e } })
                                }} />
                        </div>
                    </div>
                    <div className="row" style={{ margin: '20px 0' }}>
                        <Button type="submit" variant="contained" color="primary" disableElevation disabled={saving}>Submit Post</Button>
                    </div>
                </form>
            </div>

            <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
        </div>
    );
}