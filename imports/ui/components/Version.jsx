import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'


const Version = React.createClass({
  render() {
    let version = '';
    Meteor.call('getVersion', (err, data) => {
      if (err) throw err
      Session.set('version', data)
      version = data
    })
    return (
      <p className="version">{version}</p>
    )
  }
})

export default Version
