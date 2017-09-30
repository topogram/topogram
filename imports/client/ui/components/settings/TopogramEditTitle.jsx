import React from 'react'

import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem'

import { topogramUpdateTitle } from '../../../../api/topograms/topogramsMethods.js'

export default class TopogramEditTitle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.topogramTitle,
      open: false
    }
  }

  handleTitleChange = (event) => {
    this.setState({title : event.target.value})
  }

  handleClickUpdateTitle = () => {
    topogramUpdateTitle.call({
      topogramId : this.props.topogramId,
      title : this.state.title
    })

    this.handleClose()
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        key="cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Update Title"
        key="update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClickUpdateTitle}
      />
    ]

    return (
      <div>
        <MenuItem
          primaryText="Update Title"
          onTouchTap={this.handleOpen}
          leftIcon={<ModeEdit />}
        />
        <Dialog
          title={this.props.topogramName}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Edit Title"
            fullWidth={true}
            value={this.state.title}
            onChange={this.handleTitleChange}
            floatingLabelFixed={true}
            multiLine={true}
          />
        </Dialog>
      </div>
    )
  }
}
