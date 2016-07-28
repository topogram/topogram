import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import SideNavItem from './SideNavItem.jsx'


class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Drawer open={this.state.open}>
        <AppBar
          title="Topogram.io"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onTouchTap={this.handleToggle}
        />

        <SideNavItem
          title="SideNavItem"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </p>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </SideNavItem>

      </Drawer>
    )
  }
}


export default SideNav
