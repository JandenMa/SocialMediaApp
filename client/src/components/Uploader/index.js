import React, { Component } from 'react';
import {
  Button, IconButton, Tooltip
} from '@material-ui/core';
import {
  CloudUpload as UploadIcon,
  DeleteOutlineOutlined as RemoveIcon,
  CloudDownloadOutlined as DownloadIcon,
  VisibilityOutlined as PreviewIcon
} from '@material-ui/icons';
import AlertConfirmDialog from '../AlertConfirmDialog'
import './index.css';

export default class Uploader extends Component {
  state = {
    del_id: null,
    file_datas: [{ id: 1, name: '12.jpg' }],
    dialog_opts: {
      title: null,
      content: null,
      yesBtnText: null,
      onYesBtnClick: null,
      confirm: true
    }
  }

  getFileExt = (filename) => {
    let index = filename.lastIndexOf(".");
    let ext = filename.substr(index + 1);
    return ext;
  }

  isImage = (ext) => {
    return ['bmp', 'jpg', 'jpeg', 'png'].includes(ext);
  }

  showConfirmDialog = () => {
    this.refs.acDialog.handleShow();
  }

  beforeRemove = (e) => {
    this.setState({
      del_id: e.nativeEvent.target.dataset.rmfileid,
      dialog_opts: {
        title: 'Warning',
        content: 'Do you confirm to remove it?',
        yesBtnText: 'Continue',
        onYesBtnClick: this.handleRemove,
        confirm: true
      }
    })
    this.showConfirmDialog();
  }

  handleRemove = () => {
    console.log(this.state.del_id);
    this.setState({
      del_id: null
    })
  }

  handleUpload = () => {
    const self = this;
    let input = document.createElement('input');
    input.type = "file";
    input.accept = this.props.accept || '*';
    input.onclick = function () {
      if (self.props.maxCount && self.state.file_datas.length <= self.props.maxCount) {
        self.setState({
          dialog_opts: {
            title: 'Error',
            content: `The maximum number of uploads is ${self.props.maxCount}`,
            yesBtnText: 'OK',
            onYesBtnClick: null,
            confirm: false
          }
        })
        self.showConfirmDialog();
        return false;
      }
      return true;
    }
    input.onchange = function () {
      let file = this.files[0];
      console.log(file);
      if (self.props.maxSize && file.size > self.props.maxSize * 1024) {
        self.setState({
          dialog_opts: {
            title: 'Error',
            content: `Please upload a file which is smaller than ${self.props.maxSize}M`,
            yesBtnText: 'OK',
            onYesBtnClick: null,
            confirm: false
          }
        })
        self.showConfirmDialog();
        return false;
      }
      let { file_datas } = self.state;
      file_datas.push({
        id: Date.parse(new Date()),
        name: file.name
      })
      self.setState({
        file_datas: file_datas
      })
      console.log(self.state)
    };
    input.click();
  }

  render() {
    const { title, content, confirm, onYesBtnClick, yesBtnText } = this.state.dialog_opts;
    return (
      <div className="uploader-box">
        <Button variant="outlined" onClick={this.handleUpload}
          className="uploader-btn" color="inherit">
          {this.props.btnText || 'Upload File'}&ensp;<UploadIcon />
        </Button>
        {this.state.file_datas.map((file, index) => {
          return (
            <div className="uploader-file" key={index}>
              <Tooltip title="{file.name}" disableFocusListener>
                <span className="uploader-filename">{file.name}</span>
              </Tooltip>
              {
                this.isImage(this.getFileExt(file.name)) &&
                <Tooltip title="Preview it" disableFocusListener>
                  <IconButton className="uploader-file-btn">
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
              }
              <Tooltip title="Download it" disableFocusListener>
                <IconButton className="uploader-file-btn">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove it" disableFocusListener>
                <IconButton className="uploader-file-btn" data-rmfileid={file.id} onClick={this.beforeRemove} >
                  <RemoveIcon data-rmfileid={file.id} />
                </IconButton>
              </Tooltip>
            </div>
          )
        })}
        <AlertConfirmDialog confirm={confirm} ref="acDialog"
          title={title} content={content}
          yesBtnText={yesBtnText} onYesBtnClick={onYesBtnClick} />
      </div>
    )
  }
}
