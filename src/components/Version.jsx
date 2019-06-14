import React from 'react'
import pjson  from '../package.json'

export default class Version extends React.Component {
  render() {
    // get app version
    return (
      <p className="version">Version {pjson.version}</p>
    )
  }
}
