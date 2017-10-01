import React, { PropTypes } from 'react'

import MenuItem from 'material-ui/MenuItem'
import { topogramTogglePublic } from '../../../../api/topograms/topogramsMethods.js'

export default class TopogramTogglePublic extends React.Component {

  static propTypes = {
    topogramId : PropTypes.string.isRequired,
    topogramSharedPublic : PropTypes.bool.isRequired
  }

  handleOnClick = () =>
    topogramTogglePublic.call({
      topogramId : this.props.topogramId
    })

  render() {
    return (
      <MenuItem
        checked={this.props.topogramSharedPublic}
        primaryText={this.props.topogramSharedPublic ? 'Is Visible Online' : 'Share Publicly'}
        onClick={this.handleOnClick}
      />
    )
  }
}
