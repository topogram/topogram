import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { appLocales, messages } from '../../../i18n.js'

import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Home from 'material-ui/svg-icons/action/home';

import About from '../components/About.jsx'

const style = {
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

  handleRequestChange() {
    console.log('haha');
  }

  handleChangeSingle(e) {
    console.log(e);
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
        // touchTapCloseDelay={250}
        style={style}
        onChange={this.handleChangeSingle}
        onRequestChange={(e) => this.handleRequestChange(e)}
      >
        <MenuItem
          primaryText="Home"
          leftIcon={<Home />}
          onClick={() => this.props.router.push('/')}
        />
        <About />
{/*
        <Divider />
        <MenuItem
          primaryText="Language"
          rightIcon={<ArrowDropRight />}
          menuItems={languageMenuItems}
        /> */}

        {
          isLoggedIn ?
          <MenuItem
            primaryText='My Topograms'
            onClick={(e) => this.props.router.push('/topograms')}
            />
          :
          null
        }

        <Divider />
        {
          !isLoggedIn
          ?
          <span>
            <MenuItem
              primaryText='Login'
              onClick={(e) => this.props.router.push('/login')}
              />
            <MenuItem
              primaryText='Sign Up'
              onClick={(e) => this.props.router.push('/signup')}
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
