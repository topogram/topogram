import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { CardActions, CardHeader, CardText } from 'material-ui/Card'
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import AuthLayout from './AuthLayout.jsx'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <AuthLayout>
    <form action="/"
      onSubmit={onSubmit}>

      <CardHeader
        title="Login"
        subtitle="Welcome to Topogram"
      />

      <CardText>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

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
      </CardText>
      <CardActions>
        <RaisedButton
          type="submit"
          label="Log in"
          primary={true}
        />
      </CardActions>
    </form>
    <CardText>
      Don't have an account? <Link to={'/signup'}>Create one</Link>
    </CardText>
  </AuthLayout>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default LoginForm
