import React from 'react'
import ui from 'redux-ui'

import FlatButton from 'material-ui/FlatButton'
import {Toolbar} from 'material-ui/Toolbar';
import { Card, CardTitle, CardHeader } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import MenuItem from 'material-ui/MenuItem';
import Home from 'material-ui/svg-icons/action/home';

import CardBody from './CardBody.jsx'

import QueryBox from '../queryBox/QueryBox.jsx'
import NetworkOptions from '../networkOptions/NetworkOptions.jsx'
import GeoMapOptions from '../geoMapOptions/GeoMapOptions.jsx'
import Settings from '../settings/Settings.jsx'
import About from '../About.jsx'

import {nodeCreate} from '/imports/api/nodes/nodesMethods'

@ui()
class SideNav extends React.Component {

  handleToggleSelectionMode = () => {
    this.props.updateUI('selectionModeOn', !this.props.ui.selectionModeOn)
  }

  render() {
    const { nodes, edges } = this.props;
    const { selectionModeOn } = this.props.ui;

    return (
      <Card
        style={{ maxWidth : '40%', float : 'left'}}
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

          {/* <QueryBox
              nodes={nodes}
              edges={edges}
            /> */}

          {/* <Divider/> */}
          <Subheader>Viz Options</Subheader>
          <GeoMapOptions/>
          <NetworkOptions/>

          <Subheader>Tools</Subheader>
          <MenuItem
            primaryText="Selection Mode"
            onClick={this.handleToggleSelectionMode}
            checked={selectionModeOn}
          />

          <Divider/>
          <MenuItem
            primaryText="Home"
            leftIcon={<Home />}
            onClick={() => this.props.router.push('/')}
          />
          <Settings
            topogramTitle={this.props.topogramTitle}
            topogramId={this.props.topogramId}
            topogramIsPublic={this.props.topogramIsPublic}
            router={this.props.router}
            />
          <About />
        </CardBody>
      </Card>
    )
  }
}

export default SideNav
