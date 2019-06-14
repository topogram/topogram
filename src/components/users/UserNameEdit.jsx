import React, { PropTypes } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'

import AccountIcon from 'material-ui/svg-icons/action/account-circle'

import { updateUserName } from '../../../../api/users/userMethods.js'

export default class UserNameEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: this.props.userName
    }
  }

  static propTypes = {
    userName : PropTypes.string,
    open: PropTypes.bool
  }

  handleUserNameChange = (event) =>
    this.setState({ userName : event.target.value })

  handleClickUpdateUsername = () => {
    updateUserName.call({
      userName : this.state.userName
    })

    this.props.handleClose()
  }

  handleOpen = () => this.setState({ open: true })
  handleClose = () => this.setState({ open: false })

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        key="cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Change Username"
        key="update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClickUpdateUsername}
      />
    ]

    return (
      <div>
        <Dialog
          title={this.props.userName}
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          <TextField
            floatingLabelText="Edit Username"
            fullWidth={true}
            value={this.state.userName}
            onChange={this.handleUserNameChange}
            floatingLabelFixed={true}
            multiLine={false}
          />
        </Dialog>
      </div>
    )
  }
}
