import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';
import { Card, CardHeader } from 'material-ui/Card'


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
    const { nodes, edges } = this.props;

    const starts = this.props.nodes
      .filter(n => n.data.start)
      .map(n => new Date(n.data.start))
      .sort()

    const ends = this.props.nodes
      .filter(n => n.data.end)
      .map(n => new Date(n.data.end))
      .sort((a,b) => a-b)

    const hasTimeInfo = (starts.length || ends.length)

    console.log(starts, ends);
    return (
      <Drawer open={this.state.open}>
        <Toolbar>
          <QueryBox
              nodes={nodes}
              edges={edges}
            />
        </Toolbar>
        <CardHeader
          subtitle ={
            `${nodes.length} nodes, ${edges.length} edges `
          }
          />
        <SideNavItem
          title="Time Filter"
          disabled={!hasTimeInfo}
          // initiallyExpanded={hasTimeInfo}
        >
          <FilterByTime
            starts={starts}
            ends={ends}
            />
        </SideNavItem>
      </Drawer>
    )
  }
}

export default SideNav
