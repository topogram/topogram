import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';
import { Card, CardTitle, CardHeader } from 'material-ui/Card'

import QueryBox from '../queryBox/QueryBox.jsx'
import Settings from '../settings/Settings.jsx'
import NetworkOptions from '../networkOptions/NetworkOptions.jsx'
import FilterByTime from '../filterByTime/FilterByTime.jsx'

import {nodeCreate} from '/imports/api/nodes/nodesMethods'

@ui()
class SideNav extends React.Component {

  handleToggle() {
    this.props.updateUI('filterPanelIsOpen', !this.props.ui.filterPanelIsOpen)
  }

  render() {
    const { nodes, edges } = this.props;

    return (
      <Drawer>
        <CardTitle
          title={this.props.topogramTitle}
          titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
          subtitle={`${nodes.length} nodes, ${edges.length} edges`}
        />
        <Toolbar>
          <QueryBox
              nodes={nodes}
              edges={edges}
            />
        </Toolbar>
        <NetworkOptions/>
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
        <Settings
          topogramTitle={this.props.topogramTitle}
          topogramId={this.props.topogramId}
          router={this.props.router}
          />
      </Drawer>
    )
  }
}

export default SideNav
