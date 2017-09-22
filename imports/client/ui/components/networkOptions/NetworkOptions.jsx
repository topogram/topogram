import React from 'react'
import ui from 'redux-ui'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import SideNavItem from '../sideNav/SideNavItem.jsx'

const layouts = [
  'cose', // uncaught 'prototype' Error
  'spread', // CPU overhead
  'random',
  'breadthfirst',
  'concentric'
]
  // 'cola', // can not get it to work
  // 'arbor', // works quite okay
  // 'springy', // force rendering
  // 'grid', // uselss layout
  // 'circle', // useless as well

@ui()
export default class NetworkOptions extends React.Component {

  handleSelectLayout(e, i, value) {
    this.props.updateUI('layoutName', value)
  }

  handleSelectNodeRadius(e, i, value) {
    this.props.updateUI('nodeRadius', value)
  }

  render() {

    const layoutMenuItems = layouts.map( d => (
      <MenuItem
        value={d}
        key={d}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        />
    ))

    const NodeRadiusMenuItems = ['degree', 'weight']
      .map(d => (
        <MenuItem
          value={d}
          key={d}
          primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
          />
      ))

    return (
      <SideNavItem
        title="Network Options"
        subtitle="Layouts, colors & sizes"
        initiallyExpanded={true}
        >
        <SelectField
          floatingLabelText="Layout"
          onChange={(e, i, value) => this.handleSelectLayout(e, i, value)}
          value={this.props.ui.nodeRadius}
        >
          {layoutMenuItems}
        </SelectField>

        <SelectField
          floatingLabelText="Node Radius"
          onChange={(e, i, value) => this.handleSelectNodeRadius(e, i, value)}
        >
          {NodeRadiusMenuItems}
        </SelectField>

      </SideNavItem>
    )
  }
}
