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
    Paper,
    Snackbar
} from '@material-ui/core';
import {
    SaveSharp as SaveIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import DetailDialogStore from '../../stores/DetailDialog.store';
import AlertConfirmDialog from '../AlertConfirmDialog'
import Uploader from '../Uploader';
import './index.css';

export default class DetailDialog extends Component {
    constructor(...args) {
        super(...args);
        DetailDialogStore.subscribe(() => {
            this.setState({
                open: DetailDialogStore.getState()._open,
                id: DetailDialogStore.getState()._id,
            })
        })
    }

    state = {
        open: false,
        id: '',
        title: '',
        content: '',
        introduction: '',
        snackbar_open: false,
        canAbandon: true,
        dialog_opts: {
            title: null,
            content: null,
            yesBtnText: null,
            onYesBtnClick: null,
            confirm: true
        }
    }

    componentWillReceiveProps = (props) => {
        if (props.data && props.data.saveBlog && props.data.saveBlog.id) {
            this.setState({ snackbar_open: true })
            setTimeout(() => {
                this.setState({
                    snackbar_open: false,
                    canAbandon: true,
                    open: false,
                    id: props.data.saveBlog.id
                });
            }, 3000)
        }
    }

    handleClose = () => {
        this.setState({ snackbar_open: false });
    };

    showConfirmDialog = () => {
        this.refs.acDialog.handleShow();

    }

    beforeAbandon = () => {
        if (this.state.canAbandon) {
            this.handleAbandon();
        }
        else {
            this.setState({
                dialog_opts: {
                    title: 'Warning',
                    content: 'Do you confirm to abandon without saving?',
                    yesBtnText: 'Continue',
                    onYesBtnClick: this.handleAbandon,
                    confirm: true
                }
            })
            this.showConfirmDialog();
        }
    }

    handleTitleInput = (e) => {
        this.setState({
            title: e.target.value,
            canAbandon: false
        })
    }

    handleIntroInput = (e) => {
        this.setState({
            introduction: e.target.value,
            canAbandon: false
        })
    }

    handleContentInput = (e) => {
        this.setState({
            content: e.target.value,
            canAbandon: false
        })
    }

    handleSave = () => {
        if (!this.state.title) {
            this.setState({
                dialog_opts: {
                    title: 'Error',
                    content: 'Title is Empty',
                    yesBtnText: 'OK',
                    confirm: false
                }
            })
            this.showConfirmDialog();
            return false;
        }
        if (!this.state.content) {
            this.setState({
                dialog_opts: {
                    title: 'Error',
                    content: 'Content is Empty',
                    yesBtnText: 'OK',
                    confirm: false
                }
            })
            this.showConfirmDialog();
            return false;
        }
        if (!this.state.introduction) {
            this.setState({
                dialog_opts: {
                    title: 'Error',
                    content: 'Introduction is Empty',
                    yesBtnText: 'OK',
                    confirm: false
                }
            })
            this.showConfirmDialog();
            return false;
        }
        this.props.doMutate && this.props.doMutate({
            variables: {
                blog: {
                    id: this.state.id,
                    title: this.state.title,
                    content: this.state.content,
                    introduction: this.state.introduction
                }
            }
        })
    }

    handleAbandon = () => {
        this.setState({
            id: '',
            title: '',
            content: '',
            introduction: '',
            snackbar_open: false,
            canAbandon: true,
            dialog_opts: {
                title: null,
                content: null,
                yesBtnText: null,
                onYesBtnClick: null,
                confirm: true
            }
        })
        DetailDialogStore.dispatch({ type: 'close' });
    };

    render() {
        const { title, content, confirm, onYesBtnClick, yesBtnText } = this.state.dialog_opts;
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
                            {this.state.id == null ? 'New Blog' : 'Edit Blog'}
                        </Typography>
                        <Tooltip title="save and publish" disableFocusListener onClick={this.handleSave} >
                            <IconButton color="inherit" aria-label="Save">
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="abondon" disableFocusListener>
                            <IconButton color="inherit" aria-label="Abandon" onClick={this.beforeAbandon}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Paper className="detail_dialog_paper" elevation={1}>
                    <TextField
                        onInput={this.handleTitleInput}
                        label="Blog Title" margin="normal"
                        variant="outlined" fullWidth required
                        helperText="No more than 20 chinese characters or 40 letters"
                    />
                    <TextField
                        onInput={this.handleContentInput}
                        label="Content" margin="normal" rows="15" rowsMax="15"
                        variant="outlined" fullWidth multiline required
                    />
                    <TextField
                        onInput={this.handleIntroInput}
                        label="Introduction Or Keywords" margin="normal"
                        variant="outlined" fullWidth required
                        helperText="Not more than 30 chinese characters or 60 letters"
                    />
                    <Uploader btnText="Upload Cover Picture" />
                </Paper>
                <AlertConfirmDialog confirm={confirm} ref="acDialog"
                    title={title} content={content}
                    yesBtnText={yesBtnText} onYesBtnClick={onYesBtnClick} />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbar_open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Saved successfully</span>}
                />
            </Dialog>
        )
    }
}

function Transition(props) {
    return <Slide direction="right" {...props} />;
}


