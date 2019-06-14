import React from 'react'
import store from '../../store'

import MenuItem from 'material-ui/MenuItem'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import mapTiles from '../geoMap/mapTiles'


export default class GeoMapOptions extends React.Component {

  handleSelectGeoMapTile = (value) => {
    store.dispatch({
      type: 'GEO_SET_TILE', 
      geoMapTile : value
    })
  }

  render() {
    const mapTilesMenuItems = Object.keys(mapTiles).map( d => (
      <MenuItem
        value={d}
        key={d}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        onClick={() => this.handleSelectGeoMapTile(d)}
      />
    ))

    return (
      <MenuItem
        primaryText="Map Background"
        value={this.props.ui.geoMapTile}
        menuItems={mapTilesMenuItems}
        rightIcon={<ArrowDropRight />}
      />
    )
  }
}
