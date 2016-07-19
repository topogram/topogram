import './flashMessages.css'

export const FlashMessages = {
  sendSuccess : function(msg) {
    console.log(msg)
    Materialize.toast(msg, 3000, 'flash-success')
  },
  sendError : function(msg) {
    console.log(msg);
    Materialize.toast(msg, 3000, 'flash-error')
  }
}
