import React, { PropTypes } from 'react'

import Subheader from 'material-ui/Subheader'

import TopogramTogglePublic from './TopogramTogglePublic.jsx'
import TopogramEditTitle from './TopogramEditTitle.jsx'
import TopogramDelete from './TopogramDelete.jsx'

const Settings = ({
  topogramTitle,
  topogramId,
  router,
  topogramSharedPublic
}) => (
  <span>
    <Subheader>Settings</Subheader>
    <TopogramTogglePublic
      topogramId={topogramId}
      topogramSharedPublic={topogramSharedPublic}
      key="ToggleTopogramPublicButton"
    />
    <TopogramEditTitle
      topogramTitle= {topogramTitle}
      topogramId={topogramId}
      key="EditTopogramTitle"
    />
    <TopogramDelete
      topogramName= {topogramTitle}
      topogramId={topogramId}
      router={router}
      key="DeleteTopogram"
    />
  </span>
)

Settings.propTypes = {
  topogramId: PropTypes.string.isRequired,
  topogramTitle: PropTypes.string.isRequired,
  topogramSharedPublic: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired
}

export default Settings
