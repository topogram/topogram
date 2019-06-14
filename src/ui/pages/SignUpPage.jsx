import React, { PropTypes } from 'react'

import { Accounts } from 'meteor/accounts-base'

import Snackbar from 'material-ui/Snackbar'
import SignUpForm from '/imports/client/ui/components/auth/SignUpForm.jsx'

export class SignUpPage extends React.Component {
  constructor(props) {
    super(props)

    // set the initial component state
    this.state = {
      snackBarOpen : false,
      snackBarMessage : '',
      errors: {},
      user: {
        email: '',
        username: '',
        password: '',
        passwordConfirm: ''
      }
    }
  }

  static propTypes = {
    router: PropTypes.func.isRequired
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
    if (!user.username) errors.username = 'Username is required'
    if (!user.password) errors.password = 'Password is required'
    if (!!user.email && !validateEmail(user.email)) errors.email = 'Invalid email'
    this.setState({ errors })
  }

  handleSubmitForm(event) {
    event.preventDefault()

    const { errors } = this.state
    if (Object.keys(errors).length) return

    const { email, username, password } = this.state.user

    Accounts.createUser({ email, username, password }, err => {
      if (err) {
        this.promptSnackbar( `Error ${err.error} : ${err.reason}`)
      }
      else {
        this.promptSnackbar('User created !')
        this.props.router.push('/')
      }
    })

  }


  render() {
    const { errors, user } = this.state
    return (
      <div>
        <SignUpForm
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
