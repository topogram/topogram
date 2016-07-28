import React from 'react'
import Snackbar from 'material-ui/Snackbar'

class FlashMessages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: ''
    }
    this.promptSnackbar = this.promptSnackbar.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  promptSnackbar(msg) {
    this.setState({
      open: true,
      message: msg
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  // sendSuccess(msg, title) {
  //   console.log(msg, title)
  //   this.refs.container.success(msg, title , {
  //     closeButton: true,
  //   })
  // }
  //
  // sendError(msg, title) {
  //   this.refs.container.error(msg, title , {
  //     closeButton: true,
  //   })
  // }


  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }
}

export default FlashMessages
