import React from 'react'

import MenuItem from 'material-ui/MenuItem'
import { topogramTogglePublic } from '../../../../api/topograms/topogramsMethods.js'

export default class TogglePublicButton extends React.Component {

  handleOnClick = () => {
    console.log("click", this.props);
    topogramTogglePublic.call({
      topogramId : this.props.topogramId
    })
  }

  render() {
    return (
      <MenuItem
        checked={this.props.topogramIsPublic}
        primaryText={this.props.topogramIsPublic ? "Is Shared Publicly" : "Share Publicly"}
        onClick={this.handleOnClick}
        />
    )
  }
}
