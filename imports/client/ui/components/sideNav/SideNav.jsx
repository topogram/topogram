import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';
import { Card, CardHeader } from 'material-ui/Card'

import QueryBox from '../queryBox/QueryBox.jsx'
import Settings from '../settings/Settings.jsx'
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

  // createRandomNode() {
  //   console.log('create a node');
  //   let node = nodeCreate.call({ topogramId : this.props.topogramId })
  // }

  render() {
    const { nodes, edges } = this.props;
    // console.log(this.props);
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
        <Settings
          topogramTitle={this.props.topogramTitle}
          topogramId={this.props.topogramId}
          />
        {
          this.props.hasTimeInfo ?
            <FilterByTime />
          :
            <Card>
              <CardHeader
                title="Time Filtering"
                subtitle="No items found."
                style={{color : '#CCC'}}
              />
            </Card>
        }
      </Drawer>
    )
  }
}

export default SideNav
