import React, { PropTypes } from 'react'

import { Card } from 'material-ui/Card'

const style = {
  maxWidth: '50%',
  margin: '3em auto 0 auto',
  padding: '1em'
}

const AuthLayout = ({ children }) => (
  <Card style={style}>
    {children}
  </Card>
)

export default AuthLayout
