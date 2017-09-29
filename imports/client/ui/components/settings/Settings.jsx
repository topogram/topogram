import React from 'react'

import MenuItem from 'material-ui/MenuItem';

import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import DeleteTopogram from './DeleteTopogram.jsx'
import EditTopogramTitle from './EditTopogramTitle.jsx'
import TogglePublicButton from './TopogramTogglePublicButton.jsx'


export default class Settings extends React.Component {

  static propTypes = {
    topogramTitle : React.PropTypes.string,
    topogramIsPublic : React.PropTypes.bool
  }

  render() {
    const settingsMenuItems = [
      <TogglePublicButton
        topogramId={this.props.topogramId}
        topogramIsPublic={this.props.topogramIsPublic}
        key="ToggleTopogramPublicButton"
      />,
      <EditTopogramTitle
        topogramTitle= {this.props.topogramTitle}
        topogramId={this.props.topogramId}
        key="EditTopogramTitle"
      />,
      <DeleteTopogram
        topogramName= {this.props.topogramTitle}
        topogramId={this.props.topogramId}
        router={this.props.router}
        key="DeleteTopogram"
      />
    ]

    return (
      <MenuItem
        primaryText="Settings"
        menuItems={settingsMenuItems}
        rightIcon={<ArrowDropRight />}
        leftIcon={<SettingsIcon />}
        />
    )
  }
}
