import './flashMessages.css'
import { ToastContainer, ToastMessage } from 'react-toastr'
import './animate.css'
import './toastr.min.css'
import React from 'react'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

const FlashMessages = React.createClass({
  sendSuccess(msg, title) {
    console.log(msg, title)
    this.refs.container.success(msg, title , {
      closeButton: true,
    })
  },
  sendError(msg, title) {
    this.refs.container.error(msg, title , {
      closeButton: true,
    })
  },
  render() {
    return (
      <ToastContainer
        toastMessageFactory={ToastMessageFactory}
        ref="container"
        className="toast-top-right"
      />
    )
  }
})

export default FlashMessages
