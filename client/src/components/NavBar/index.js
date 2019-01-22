import React, { Component } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Tooltip
} from '@material-ui/core';
import {
    AccountCircle as AccountIcon,
    AddCircle as AddIcon
} from '@material-ui/icons';
import DetailDialogStore from '../../stores/DetailDialog.store';
import LoginStore from '../../stores/Login.store';
import AlertConfirmDialog from '../AlertConfirmDialog'
import './index.css'

export default class NavBar extends Component {
    constructor(...args) {
        super(...args);
        LoginStore.subscribe(() => {
            this.setState({
                auth: LoginStore.getState()._auth,
                anchorEl: null
            })
            this.renderSigninBtn();
            this.renderAccountBtn();
        })
    }
    state = {
        auth: false,
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }


    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleAddNewBlog = () => {
        DetailDialogStore.dispatch({ type: 'add' });
    }

    handleSignin = () => {
        LoginStore.dispatch({ type: 'login' });
    }

    showConfirmDialog = () => {
        this.setState({ anchorEl: null });
        this.refs.acDialog.handleShow();
    }

    handleSignout = () => {
        LoginStore.dispatch({ type: 'logout' });
    }

    renderSigninBtn = () => {
        return (
            !this.state.auth && <Button color="inherit"
                className="navbar_account"
                onClick={this.handleSignin}
            >Sign In</Button>
        );
    }

    renderAccountBtn = () => {
        if (this.state.auth) {
            return (
                <div className="navbar_account">
                    <Tooltip title="Account Setting"
                        aria-label="Account Setting"
                        disableFocusListener>
                        <IconButton color="inherit"
                            aria-haspopup="true"
                            onClick={this.handleMenu}>
                            <AccountIcon color="secondary" fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Menu id="menu-account"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}>
                        <MenuItem>My Blogs</MenuItem>
                        <MenuItem onClick={this.showConfirmDialog}>Sign Out</MenuItem>
                    </Menu>

                    <AlertConfirmDialog ref="acDialog"
                        onYesBtnClick={this.handleSignout}
                        confirm
                        title="Confirm your operation"
                        content="Do you confirm to sign out?"
                        yesBtnText="ok" />

                    <Tooltip title="Write a new blog"
                        aria-label="Write a new blog"
                        disableFocusListener>
                        <IconButton color="inherit"
                            aria-haspopup="true"
                            onClick={this.handleAddNewBlog}
                        >
                            <AddIcon color="primary" fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="navbar">
                <AppBar color='default' position='fixed'>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Kofix Blog
                        </Typography>
                        {this.renderSigninBtn()}
                        {this.renderAccountBtn()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
