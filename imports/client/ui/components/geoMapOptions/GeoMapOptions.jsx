import React from 'react'
import ui from 'redux-ui'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import SideNavItem from '../sideNav/SideNavItem.jsx'
import mapTiles from '../geoMap/mapTiles'

@ui()
export default class GeoMapOptions extends React.Component {

  handleSelectGeoMapTile(e, i, value) {
    this.props.updateUI('geoMapTile', value)
  }

  render() {
    const mapTilesMenuItems = Object.keys(mapTiles).map( d => (
      <MenuItem
        value={d}
        key={d}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        />
    ))

    return (
      <SideNavItem
        title="GeoMap Options"
        subtitle="Options for map"
        initiallyExpanded={true}
        >
          <SelectField
            floatingLabelText="Map Background"
            onChange={(e, i, value) => this.handleSelectGeoMapTile(e, i, value)}
            value={this.props.ui.geoMapTile}
          >
            {mapTilesMenuItems}
          </SelectField>
      </SideNavItem>
    )
  }
}
