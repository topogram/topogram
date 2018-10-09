import React from 'react'
import ui from 'redux-ui'

import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

const layouts = [
  'preset',
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

  handleSelectLayout = (value) => {
    this.props.updateUI('layoutName', value)
  }

  handleSelectNodeRadius = (value) => {
    this.props.updateUI('nodeRadius', value)
  }

  render() {

    const layoutMenuItems = layouts.map( d => (
      <MenuItem style={{backgroundColor: 'rgba(69,90,100 ,0.9)',
      color:'#F2EFE9',}}
        value={d}
        key={d}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        onClick={() => this.handleSelectLayout(d)}
      />
    ))

    const NodeRadiusMenuItems = ['degree', 'weight']
      .map(d => (
        <MenuItem style={{backgroundColor: 'rgba(69,90,100 ,0.9)',
        color:'#F2EFE9',}}
          value={d}
          key={d}
          primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
          onClick={() => this.handleSelectNodeRadius(d)}
        />
      ))

    return (
      <div>
        <MenuItem
        style={{backgroundColor: 'rgba(69,90,100 ,0.9)',
        color:'#F2EFE9',}}
          primaryText="Network Layout"
          onChange={(e, i, value) => this.handleSelectLayout(e, i, value)}
          rightIcon={<ArrowDropRight />}
          // secondaryText={this.props.ui.layoutName}
          menuItems={layoutMenuItems}
        />
        <MenuItem
        style={{backgroundColor: 'rgba(69,90,100 ,0.9)',
        color:'#F2EFE9',}}
          primaryText="Node Radius"
          onChange={(e, i, value) => this.handleSelectNodeRadius(e, i, value)}
          rightIcon={<ArrowDropRight />}
          // secondaryText={this.props.ui.nodeRadius}
          menuItems={NodeRadiusMenuItems}
        />
      </div>
    )
  }
}
