import React, { PropTypes } from 'react'
import { CardTitle } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'

import PanelSelector from '../panelSelector/PanelSelector.jsx'

import NetworkOptions from '../networkOptions/NetworkOptions.jsx'
import GeoMapOptions from '../geoMapOptions/GeoMapOptions.jsx'
import Settings from '../settings/Settings.jsx'
import GraphicalTweaks from '../settings/GraphicalTweaks.jsx'
const PanelSettings = ({
  geoMapVisible,
  chartsVisible,

  authorIsLoggedIn,
  topogramId,
  topogramTitle,
  topogramIsPublic,
  hasTimeInfo,
  hasGeoInfo,
  hasCharts,
  router
}) => (
  <span>
    <Subheader
    >Settings</Subheader>

    <PanelSelector

      hasTimeInfo={ hasTimeInfo }
      hasGeoInfo={ hasGeoInfo }
      hasCharts={ hasCharts }
    />

    { geoMapVisible ? <GeoMapOptions/> : null }
    { chartsVisible ? <ChartsOptions/> : null }
    <NetworkOptions/>

    {
      authorIsLoggedIn ?
      <Settings
      style={{backgroundColor: '#D4E6CC!important', color:'rgb(242, 239, 233)'}}
        topogramId={topogramId}
        topogramTitle= {topogramTitle}
        topogramSharedPublic={topogramIsPublic}
        router={router}
      />
      :
      null
    }
    {
      <GraphicalTweaks
      style={{backgroundColor: '#D4E6CC!important', color:'rgb(242, 239, 233)'}}
      />
    }
  </span>
)

export default PanelSettings
