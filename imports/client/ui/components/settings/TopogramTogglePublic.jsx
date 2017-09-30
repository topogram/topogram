import React from 'react'

import MenuItem from 'material-ui/MenuItem'
import { topogramTogglePublic } from '../../../../api/topograms/topogramsMethods.js'

export default class TopogramTogglePublic extends React.Component {

  handleOnClick = () => {
    console.log("click", this.props);
    topogramTogglePublic.call({
      topogramId : this.props.topogramId
    })
  }

  render() {
    return (
      <MenuItem
        checked={this.props.topogramSharedPublic}
        primaryText={this.props.topogramSharedPublic ? "Is Visible Online" : "Share Publicly"}
        onClick={this.handleOnClick}
        />
    )
  }
}
