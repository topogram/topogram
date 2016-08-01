import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import SideNavItem from './SideNavItem.jsx'
import NodesLab from '../nodes/NodesLab.jsx'
import EdgesLab from '../edges/EdgesLab.jsx'


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
    const
      nodes = this.props.elements.nodes,
      edges = this.props.elements.edges,
      importUrl = '/topograms/' + this.props.topogram._id + '/import'


    return (
      <Drawer open={this.state.open}>
        <AppBar
          title="Topogram.io"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onTouchTap={this.handleToggle}
        />

        <SideNavItem
          title="Data"
          initiallyExpanded={true}
        >
          <NodesLab
            nodes={nodes}
          />
          <EdgesLab
            edges={edges}
          />
          <FlatButton
            label="Import Data"
            href={importUrl}
          />
        </SideNavItem>

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

SideNav.propTypes = {
  topogramId: React.PropTypes.string,
  elements: React.PropTypes.object,
  topogram: React.PropTypes.object
}

SideNav.defaultProps = {
  elements : { nodes : [], edges : [] },
  topogram : {}
}

export default SideNav
