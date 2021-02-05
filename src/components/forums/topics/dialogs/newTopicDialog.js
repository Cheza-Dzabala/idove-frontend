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

export default ({ open, setOpen, saveTopic, handleChange }) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Attach A Topic"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Your topic should comply with all terms & conditions of the iDove platform.
            </DialogContentText>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={saveTopic}>
                    <TextField
                        autoFocus
                        id="name"
                        label="Title"
                        variant="outlined"
                        name="title"
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button type={"submit"} color="primary">
                        Attach Topic
                 </Button>
                </form>
            </DialogContent>
        </Dialog>

    );
}