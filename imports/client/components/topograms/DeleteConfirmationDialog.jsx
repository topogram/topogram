import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage, injectIntl } from 'react-intl'

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

    const { messages } = this.props.intl

    const actions = [
      <FlatButton
        label={messages['topogram.index.card.button.cancel']}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={messages['topogram.index.card.button.delete']}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deleteItem}
      />,
    ]
    return (
      <div>
        <FlatButton
          label={messages['topogram.index.card.button.delete']}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title={this.props.topogramName}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <FormattedMessage
            id="topogram.index.card.deleteDialog.confirmQuestion"
           />
        </Dialog>
      </div>
    )
  }
})

export default injectIntl(DeleteConfirmationDialog)
