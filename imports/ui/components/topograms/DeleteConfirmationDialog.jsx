import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const DeleteConfirmationDialog = React.createClass({

  getDefaultProps() {
    return {
      topogramName: '',
      topogramId : ''
    }
  },
  getInitialState() {
    return {
      open: false
    }
  },
  handleOpen() {
    this.setState({ open: true })
  },
  handleClose() {
    this.setState({ open: false })
  },
  _deleteItem() {
    Meteor.call( 'deleteTopogram', this.props.topogramId )
  },
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deleteItem}
      />,
    ]
    return (
      <div>
        <FlatButton
          label="Delete"
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete the topogram {this.props.topogramName}
        </Dialog>
      </div>
    )
  }
})

export default DeleteConfirmationDialog
