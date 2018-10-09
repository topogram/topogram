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
          this.props.topogramSharedPublic ? {backgroundColor: 'rgba(69,90,100 ,0.9)',
          color : '#BDBDBD'} : {backgroundColor: 'rgba(69,90,100 ,0.9)',
          color:'#F2EFE9',}
        }
        primaryText={this.props.topogramSharedPublic ? 'Is Visible Online' : 'Share Publicly'}
        onClick={this.handleOnClick}
        leftIcon={<WorldIcon />}
      />
    )
  }
}
