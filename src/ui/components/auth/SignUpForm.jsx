import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import AuthLayout from './AuthLayout.jsx'

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <AuthLayout>
    <form action="/"
      onSubmit={onSubmit}>
      <CardHeader
        title="Sign Up"
        subtitle="Welcome to Topogram"
      />
      <CardText>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
          <TextField
            floatingLabelText="Name"
            name="username"
            errorText={errors.username}
            onChange={onChange}
            value={user.username}
          />
        </div>

        <div className="field-line">
          <TextField
            floatingLabelText="Email"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>

        <div className="field-line">
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>

        {/* <div className="field-line">
        <TextField
          floatingLabelText="Password Confirm"
          type="password"
          name="passwordConfirm"
          onChange={onChange}
          errorText={errors.passwordConfirm}
          value={user.passwordConfirm}
        />
      </div> */}

      </CardText>
      <CardActions>
        <RaisedButton
          type="submit"
          label="Create New Account"
          primary={true}
        />
      </CardActions>
    </form>
    <CardText>
    Already have an account? <Link to={'/login'}>Log in</Link>
    </CardText>
  </AuthLayout>
)

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default SignUpForm
