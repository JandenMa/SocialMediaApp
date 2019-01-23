import React, { Component } from 'react';
import moment from 'moment';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AlertConfirmDialog from '../AlertConfirmDialog'
import LoginStore from '../../stores/Login.store'
import DetailDialogStore from '../../stores/DetailDialog.store'
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  IconButton,
  Snackbar
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DelIcon
} from '@material-ui/icons'
import './index.css';

const GQL = {
  MY_BLOG_LIST: gql`
  {
    getBlogs{
      id,title,createTime,lastUpdateTime
    }
  }`,
  DELETE_BLOG: gql`
    mutation DeleteBlog($id:String!){
      deleteBlog(id:$id){
        id,title,createTime,lastUpdateTime
      }
    }
  `
}

export default class index extends Component {

  state = {
    snackbar_open: false,
    dialog_opts: {
      title: null,
      content: null,
      yesBtnText: null,
      onYesBtnClick: null,
      confirm: false
    }
  }

  componentWillMount() {
    if (!LoginStore.getState()._auth) {
      window.location.href = '/';
    }
  }

  showConfirmDialog = () => {
    this.refs.acDialog.handleShow();
  }

  renderBlogTableCell = (value) => {
    return (
      <TableCell>
        <Tooltip title={value}>
          <Typography>{value}</Typography>
        </Tooltip>
      </TableCell>
    )
  }

  renderOperationBtn = (id, doDelete) => {
    return (
      <TableCell align="center">
        <Tooltip title="Edit">
          <IconButton color="primary" onClick={() => this.handleEdit(id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="secondary" onClick={() => this.beforeDelete(id, doDelete)}>
            <DelIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    )
  }

  handleEdit=(id)=>{
    DetailDialogStore.dispatch({type:'edit',id})
  }

  beforeDelete = (id, doDelete) => {
    this.setState({
      dialog_opts: {
        title: 'Warning',
        content: 'Do you confirm to delete it?',
        yesBtnText: 'continue',
        onYesBtnClick: () => this.handleDelete(id, doDelete),
        confirm: true
      }
    })
    this.showConfirmDialog();
  }

  handleDelete = (id, doDelete) => {
    doDelete({
      variables: { id }
    })
  }

  afterDelete = (cache, { data: { deleteBlog } }) => {
    let { getBlogs } = cache.readQuery({
      query: GQL.MY_BLOG_LIST,
    })
    getBlogs.forEach(({ id }, index) => {
      if (id === deleteBlog.id) {
        getBlogs.splice(index, 1);
      }
    })
    cache.writeQuery({
      query: GQL.MY_BLOG_LIST,
      data: { getBlogs },
    })
  }

  render() {
    const { title, content, confirm, onYesBtnClick, yesBtnText } = this.state.dialog_opts;
    return (
      <div>
        <Paper className="myblog-box">
          <Table className="myblog-table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Create Time</TableCell>
                <TableCell>Last Update Time</TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Query query={GQL.MY_BLOG_LIST}>
                {({ loading, error, data }) => {
                  if (loading) return <TableRow><TableCell>Loading...</TableCell></TableRow>;
                  if (error) return <TableRow><TableCell>Error :{error}</TableCell></TableRow>;
                  return data.getBlogs.map(({
                    id, title, createTime, lastUpdateTime
                  }) => (
                      <Mutation mutation={GQL.DELETE_BLOG} key={id} update={this.afterDelete}>
                        {(doDelete, { data }) => {
                          return (
                            <TableRow>
                              {this.renderBlogTableCell(id)}
                              {this.renderBlogTableCell(title)}
                              {this.renderBlogTableCell(moment.unix(createTime).format('YYYY-MM-DD HH:mm:ss'))}
                              {this.renderBlogTableCell(moment.unix(lastUpdateTime).format('YYYY-MM-DD HH:mm:ss'))}
                              {this.renderOperationBtn(id, doDelete)}
                            </TableRow>
                          )
                        }}
                      </Mutation>
                    ))
                }}
              </Query>
            </TableBody>
          </Table>
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
          message={<span id="message-id">Deleted successfully</span>}
        />
      </div>
    )
  }
}
