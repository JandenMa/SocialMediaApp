import React, { Component } from 'react';
import {
    Dialog,
    AppBar,
    IconButton,
    Typography,
    Slide,
    Toolbar,
    Tooltip,
    TextField,
    Paper
} from '@material-ui/core';
import {
    SaveSharp as SaveIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import DetailDialogStore from '../../stores/DetailDialog.store';
import './index.css';

export default class DetailDialog extends Component {
    constructor(...args) {
        super(...args);
        DetailDialogStore.subscribe(() => {
            this.setState({
                open: DetailDialogStore.getState()._open,
                isNew:DetailDialogStore.getState()._isNew
            })
        })
    }
    state = {
        open: false,
        isNew:true
    }

    handleAbandon = () => {
        DetailDialogStore.dispatch({ type: 'close' });
    };

    render() {
        return (
            <Dialog
                className="detail_dialog"
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar color="primary" position="fixed">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className="detail_dialog_title" >
                            {this.state.isNew?'New Blog':'Edit Blog'}
                        </Typography>
                        <Tooltip title="save and publish" disableFocusListener >
                            <IconButton color="inherit" aria-label="Save">
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="abondon" disableFocusListener>
                            <IconButton color="inherit" aria-label="Abandon" onClick={this.handleAbandon}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Paper className="detail_dialog_paper" elevation={2}>
                    <TextField 
                        label="Blog Title" margin="normal"
                        variant="outlined" fullWidth required
                        helperText="No more than 20 chinese characters or 40 letters"
                    />
                    <TextField 
                        label="Content" margin="normal" rows="15" rowsMax="15"
                        variant="outlined" fullWidth multiline required
                    />
                    <TextField 
                        label="Introduction Or Keywords" margin="normal"
                        variant="outlined" fullWidth required
                        helperText="Not more than 30 chinese characters or 60 letters"
                    />
                </Paper>

            </Dialog>
        )
    }
}

function Transition(props) {
    return <Slide direction="right" {...props} />;
}
