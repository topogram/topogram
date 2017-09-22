import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';
import { Card, CardTitle, CardHeader } from 'material-ui/Card'
import CardBody from './CardBody.jsx'

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
      <Card
        style={{maxWidth : '40%'}}
        >
        <CardTitle
          title={this.props.topogramTitle}
          showExpandableButton={true}
          actAsExpander={true}
          titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
          subtitle={`${nodes.length} nodes, ${edges.length} edges`}
        />
        <CardBody
          expandable={true}
          >
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
              <CardHeader
                title="Time Filtering"
                subtitle="No items found."
                style={{color : '#CCC'}}
              />

          }
          <Settings
            topogramTitle={this.props.topogramTitle}
            topogramId={this.props.topogramId}
            router={this.props.router}
            />
        </CardBody>
      </Card>
    )
  }
}

export default SideNav
