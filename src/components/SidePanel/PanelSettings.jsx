import React, { PropTypes } from 'react'
import { CardTitle } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'

import PanelSelector from '../panelSelector/PanelSelector.jsx'

import NetworkOptions from '../networkOptions/NetworkOptions.jsx'
import GeoMapOptions from '../geoMapOptions/GeoMapOptions.jsx'
// import Settings from '../settings/Settings.jsx'

const PanelSettings = ({
  geoMapVisible,
  timeLineVisible,
  graphVisible,
  hasTimeInfo,
  hasGeoInfo
}) => (
  <span>
    <Subheader>Settings</Subheader>

    <PanelSelector
      // bottom={timeLineVisible ? '21vh' : '1em'}
      hasTimeInfo={ hasTimeInfo }
      hasGeoInfo={ hasGeoInfo }
      timeLineVisible={ timeLineVisible }
      geoMapVisible={ geoMapVisible }
      graphVisible={ graphVisible }
    />

    { geoMapVisible ? <GeoMapOptions/> : null }
    <NetworkOptions/>
    {
      // authorIsLoggedIn ?
      // <Settings
      //   topogramId={topogramId}
      //   topogramTitle= {topogramTitle}
      //   topogramSharedPublic={topogramIsPublic}
      //   router={router}
      // />
      // :
      // null
    }
  </span>
)

export default PanelSettings
