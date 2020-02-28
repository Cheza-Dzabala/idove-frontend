import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

export default ({ open, setOpen, saveForum, handleChange, isLoading }) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"New Forum"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    A forum is a place where all iDovers can create discussion topics and discuss things that matter without ever having to be connected.
            </DialogContentText>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={saveForum}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Forum Title"
                        type="email"
                        variant="outlined"
                        name="title"
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
                    <Button type={"submit"} color="primary">
                        Create Forum
                 </Button>
                </form>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>

    );
}