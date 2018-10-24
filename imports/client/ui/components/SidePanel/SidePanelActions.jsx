import React, { PropTypes } from 'react'

import {Toolbar} from 'material-ui/Toolbar';

import {CardActions} from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'

import ActionHome from 'material-ui/svg-icons/action/home';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import InfoIcon from 'material-ui/svg-icons/action/info';

import UserMenu from '../UserMenu.jsx'

const SidePanelActions = ({
  setPanelName,
  user,
  router
}) => (

  <Toolbar
    style={{
      position:'sticky',
      width : '100%',
      top : 0
    }}
    >
    <IconButton onClick={() => setPanelName('edit')}>
      <SettingsIcon />
    </IconButton>
    <IconButton onClick={() => setPanelName('main')}>
      <ActionHome />
    </IconButton>

    <IconButton onClick={() => setPanelName('about')}>
      <InfoIcon />
    </IconButton>


    <UserMenu
      user={user}
      router={router}
      />
  </Toolbar>
)

export default SidePanelActions
