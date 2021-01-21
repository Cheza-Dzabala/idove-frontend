import React, { useEffect, useState } from 'react';
import Axios from '../../helpers/Axios';
import { headers } from '../../helpers/AuthHelpers';
import GroupCard from './GroupCard'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { objectMapper } from '../../utilities/profile/resolver';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from "../feedback/Snackbar";
import Backdrop from "../feedback/Backdrop";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));


export default () => {
    const [userGroup, setUserGroups] = useState([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [groupData, setGroupData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('info');

    const getGroups = () => Axios.get('api/groups', { headers })
        .then(response => {
            setBackdropOpen(false);
            setUserGroups(response.data.data)
        }).catch(error => {
            setSnackBarSeverity('error')
            setSnackBarMessage('Unable to load groups')
            setSnackBarOpen(true)
            console.log(error.response)
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const _groupCopy = groupData;
        _groupCopy[name] = value;
        setGroupData(_groupCopy);
        console.log('Group', groupData);
    }

    const uploadImage = (e) => {
        const { name, files } = e.target;
        const _groupCopy = groupData;
        _groupCopy[name] = files[0];
        setGroupData(_groupCopy);
        console.log('Group', groupData);
    }

    const saveGroups = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = objectMapper(groupData);
        console.log(formData);
        Axios.post('api/groups/create',
            formData,
            { headers })
            .then(response => {
                setIsLoading(false)
                getGroups();
                setOpen(false);
                setSnackBarSeverity('success')
                setSnackBarMessage('Successfully saved your group')
                setSnackBarOpen(true)
            }).catch(error => {
                setIsLoading(false)
                setSnackBarSeverity('error')
                setSnackBarMessage('Unable to load groups')
                setSnackBarOpen(true)
                console.log(error.response)
            });
    }


    useEffect(() => {
        setBackdropOpen(true)
        getGroups();
    }, [])

    return (
        <>
            <div className="container">
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"New Group"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Fill out the form below to add a new group.
                        </DialogContentText>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={saveGroups}>
                            <TextField
                                autoFocus
                                id="name"
                                label="Group Name"
                                type="email"
                                variant="outlined"
                                name="name"
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="Description"
                                onChange={handleChange}
                                multiline
                                rows={3}
                                variant="outlined"
                                name="description"
                                fullWidth
                            />
                            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                                <label htmlFor="avatar">Select an avatar:
                            <span className="text-danger"> *
                                </span></label>
                                <input type="file" id="avatar" name="avatar" required accept="image/png, image/jpeg" onChange={e => uploadImage(e)}></input>
                            </div>
                            <Button type={"submit"} color="primary">
                                Create Group
                             </Button>
                        </form>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                    {isLoading ? <LinearProgress /> : ''}
                </Dialog>

                <div className="row">
                    <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="friend-item friend-groups create-group" data-mh="friend-groups-item" style={{ height: '396px' }}>

                            <div className="content">
                                <a href="#" className="btn btn-control bg-purple" onClick={() => setOpen(true)}>
                                    <svg className="olymp-plus-icon"><use href="svg-icons/sprites/icons.svg#olymp-plus-icon"></use></svg>
                                    <div className="ripple-container"></div></a>

                                <div className="author-content">
                                    <a href="#" className="h5 author-name">New Group</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {userGroup.length > 0 ? userGroup.map(group => <GroupCard group={group} key={group.id} />) : ''}
                </div>
            </div>
            <Snackbar severity={snackBarSeverity} open={snackBarOpen} setOpen={setSnackBarOpen} message={snackBarMessage} />
            <Backdrop open={backdropOpen} />
        </>
    );
}