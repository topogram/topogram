import React, { PropTypes } from 'react'

import MenuItem from 'material-ui/MenuItem'
import { topogramTogglePublic } from '../../../../api/topograms/topogramsMethods.js'
import WorldIcon from 'material-ui/svg-icons/social/public'
import CheckedIcon from 'material-ui/svg-icons/navigation/check'


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
        rightIcon={
          this.props.topogramSharedPublic ? <CheckedIcon /> : null
        }
        style={
          this.props.topogramSharedPublic ? {color : '#BDBDBD'} : {}
        }
        primaryText={this.props.topogramSharedPublic ? 'Is Visible Online' : 'Share Publicly'}
        onClick={this.handleOnClick}
        leftIcon={<WorldIcon />}
      />
    )
  }
}
