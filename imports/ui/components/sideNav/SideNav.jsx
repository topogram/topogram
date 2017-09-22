import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';

import SideNavItem from './SideNavItem.jsx'
import NodesLab from '../nodes/NodesLab.jsx'
import EdgesLab from '../edges/EdgesLab.jsx'
import QueryBox from '../queryBox/QueryBox.jsx'
import FilterByTime from '../filterByTime/FilterByTime.jsx'

import {nodeCreate} from '/imports/api/nodes/nodesMethods'

@ui()
class SideNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleToggle() {
    this.props.updateUI('filterPanelIsOpen', !this.props.ui.filterPanelIsOpen)
  }

  createRandomNode() {
    console.log('create a node');
    let node = nodeCreate.call({ topogramId : this.props.topogramId })
  }

  render() {
    return (
      <Drawer open={this.state.open}>
        <Toolbar>
          <QueryBox
              nodes={this.props.nodes}
              edges={this.props.edges}
            />
        </Toolbar>

        <SideNavItem
          title="Data"
          initiallyExpanded={true}
        >
          <FilterByTime />
        </SideNavItem>

        <SideNavItem
          title="Data"
          initiallyExpanded={false}
        >
          <NodesLab
            nodes={this.props.nodes}
          />
          <EdgesLab
            edges={this.props.edges}
          />
          {/* <FlatButton
            label="Import Data"
            href={importUrl}
          /> */}
        </SideNavItem>
      </Drawer>
    )
  }
}

export default SideNav
