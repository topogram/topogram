import React from 'react'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import SideNavItem from './SideNavItem.jsx'
import NodesLab from '../nodes/NodesLab.jsx'
import EdgesLab from '../edges/EdgesLab.jsx'

import {nodeCreate} from '/imports/api/nodes/nodesMethods'

class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  createRandomNode() {
    console.log('create a node');
    let node = nodeCreate.call({ topogramId : this.props.topogramId })
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
          onClick={this.handleToggle}
        />


        <FlatButton
          label="Create Node"
          onClick={this.createRandomNode.bind(this)}
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
