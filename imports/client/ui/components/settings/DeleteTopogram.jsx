import React from 'react'

import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl'
import {red500} from 'material-ui/styles/colors';

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

const DeleteTopogram = React.createClass({

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
    topogramDelete.call({
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
        <MenuItem
          // style={{backgroundColor : 'red', color : 'white'}}
          primaryText={formatMessage(messages.delete)}
          onTouchTap={this.handleOpen}
          leftIcon={<Delete color={red500} />}
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

export default injectIntl(DeleteTopogram)
