import React from 'react'

import { Accounts } from 'meteor/accounts-base'
import Snackbar from 'material-ui/Snackbar'
import LoginForm from '/imports/client/ui/components/auth/LoginForm.jsx'

export class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    // set the initial component state
    this.state = {
      snackBarOpen : false,
      snackBarMessage : '',
      errors: {},
      user: {
        email: '',
        username: ''
      }
    }
  }

  promptSnackbar(msg) {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: msg
    })
  }

  handleSnackbarClose() {
    this.setState({
      snackBarOpen: false,
    })
  }

  handleChangeUser(event) {
    const field = event.target.name
    const { user } = this.state
    user[field] = event.target.value

    this.setState({
      user
    })

    // validate data
    const errors = {}
    if (!user.email) errors.username = 'Username is required'
    if (!user.password) errors.password = 'Password is required'
    if (!!user.email && !validateEmail(user.email)) errors.email = 'Invalid email'
    this.setState({ errors })
  }

  handleSubmitForm(event) {
    event.preventDefault()

    const { errors } = this.state
    if (Object.keys(errors).length) return

    const { email, password } = this.state.user
    console.log(email, password)
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.promptSnackbar( `Error ${err.error} : ${err.reason}`)
      }
      else {
        this.promptSnackbar('You are logged in')
        this.props.router.push('/')
      }
    })
  }


  render() {
    const { errors, user } = this.state
    return (
      <div>
        <LoginForm
          onSubmit={(e) => this.handleSubmitForm(e)}
          onChange={(e) => this.handleChangeUser(e)}
          errors={errors}
          user={user}
        />
        <Snackbar
          open={this.state.snackBarOpen}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.handleSnackbarClose()}
        />
      </div>
    )
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
