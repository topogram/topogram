import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {ListItem} from 'material-ui/List';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import SideNavItem from '../sideNav/SideNavItem.jsx'
import DeleteTopogram from '../topograms/DeleteTopogram.jsx'
import EditTopogramTitle from '../topograms/EditTopogramTitle.jsx'

export default class Settings extends React.Component {

  static propTypes = {
    topogramTitle : React.PropTypes.string
  }

  render() {
    return (
      <ListItem
        primaryText="Settings"
        leftIcon={<SettingsIcon />}
        primaryTogglesNestedList={true}
        nestedItems={[
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
        ]}
      />
    )
  }
}
