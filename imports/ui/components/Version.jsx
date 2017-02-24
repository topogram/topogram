import React from 'react'
import { Meteor } from 'meteor/meteor'

class Version extends React.Component {
  constructor(props) {
    super(props)
    this.state = { version: '' }
  }

  render() {
    Meteor.call('getVersion', (err, data) => {
      if (err) throw err
      this.setState({ 'version' : data })
    })
    return (
      <p className="version">Version {this.state.version}</p>
    )
  }
}

export default Version
