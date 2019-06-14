import React from 'react'
import store from '../../store'

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


export default class NetworkOptions extends React.Component {

  handleSelectLayout = (value) => {
    store.dispatch({
      type : 'NETWORK_SET_LAYOUT',
      layoutName : value
    })
  }

  handleSelectNodeRadius = (value) => {
    store.dispatch({
      type : 'NETWORK_SET_NODE_RADIUS',
      nodeRadius : value
    })
  }

  render() {

    const layoutMenuItems = layouts.map( d => (
      <MenuItem
        value={d}
        key={d}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        onClick={() => this.handleSelectLayout(d)}
      />
    ))

    const NodeRadiusMenuItems = ['degree', 'weight']
      .map(d => (
        <MenuItem
          value={d}
          key={d}
          primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
          onClick={() => this.handleSelectNodeRadius(d)}
        />
      ))

    return (
      <div>
        <MenuItem
          primaryText="Network Layout"
          onChange={(e, i, value) => this.handleSelectLayout(e, i, value)}
          rightIcon={<ArrowDropRight />}
          // secondaryText={this.props.ui.layoutName}
          menuItems={layoutMenuItems}
        />
        <MenuItem
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
