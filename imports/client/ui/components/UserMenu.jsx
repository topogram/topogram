import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { appLocales, messages } from '../../../i18n.js'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
  maxWidth : '60px',
  position : 'fixed',
  top : '3vh',
  right : '1vw'
}


export default class UserMenu extends React.Component {

  componentDidMount() {
    this.props.loadUser() // init User
  }

  logout() {
    Meteor.logout(err => {
      if (err) console.log(err)
      else console.log('logout')
    });
  }

  render() {
    const {isLoggedIn} = this.props.user
    const currentLanguage = 'en'
    const languageMenuItems = Object.keys(messages).map( l => {
      let abbr = l.split('-')[0]
      return (
        <MenuItem
          value={l}
          key={l}
          primaryText={abbr}
          checked={currentLanguage === abbr}
        />
      )
    })

    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        touchTapCloseDelay={250}
        style={style}
      >
        <MenuItem
          primaryText="Language"
          rightIcon={<ArrowDropRight />}
          menuItems={languageMenuItems}
        />
        {
          !isLoggedIn
          ?
          <span>
            <MenuItem
              primaryText='Login'
              onClick={() => this.props.router.push('/login')}
              />
            <MenuItem
              primaryText='Sign Up'
              onClick={() => this.props.router.push('/signup')}
              />
          </span>
          :
          <MenuItem
            primaryText="Sign out"
            onClick={() => this.logout()}
          />
        }
      </IconMenu>
    )
  }
}

// initalLocale: React.PropTypes.oneOf(appLocales),
