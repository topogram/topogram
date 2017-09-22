import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl'

import { topogramDelete } from '../../../../api/topograms/topogramsMethods.js'

const messages = defineMessages({
  confirmQuestion : {
    'id': 'topogram.index.card.deleteDialog.confirmQuestion',
    'defaultMessage': 'Are you sure you want to delete this topogram ?',
    'message': ''
  },
  cancel : {
    'id': 'topogram.deleteDialog.button.cancel',
    'defaultMessage': 'Cancel',
    'message': ''
  },
  delete : {
    'id': 'topogram.deleteDialog.button.delete',
    'defaultMessage': 'Delete',
    'message': ''
  }
})

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
    topogramDelete.call( {
      topogramId : this.props.topogramId
    })
    this.props.router.push('/')

  },
  render() {
    const { formatMessage } = this.props.intl
    const actions = [
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={formatMessage(messages.delete)}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deleteItem}
      />,
    ]
    return (
      <div>
        <FlatButton
          style={{color : 'red'}}
          label={formatMessage(messages.delete)}
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
            {...messages.confirmQuestion}
           />
        </Dialog>
      </div>
    )
  }
})

export default injectIntl(DeleteConfirmationDialog)
