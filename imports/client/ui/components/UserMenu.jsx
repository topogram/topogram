import React, { PropTypes } from 'react'

// import { messages } from '../../../i18n.js'

import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Home from 'material-ui/svg-icons/action/home'

import About from '../components/About.jsx'

export default class UserMenu extends React.Component {


    static propTypes = {
      router : PropTypes.shape({
        push : PropTypes.func
      }),
      user : PropTypes.shape({
        isLoggedIn : PropTypes.bool
      }),
      style : PropTypes.object
    }

    logout() {
      Meteor.logout(err => {
        if (err) throw err
        // else TODO : snackbar console.log('logout')
      })
    }

    render() {
      const { isLoggedIn } = this.props.user
      // const currentLanguage = 'en'
      // const languageMenuItems = Object.keys(messages).map( l => {
      //   const abbr = l.split('-')[0]
      //   return (
      //     <MenuItem
      //       value={l}
      //       key={l}
      //       primaryText={abbr}
      //       checked={currentLanguage === abbr}
      //     />
      //   )
      // })

      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          // touchTapCloseDelay={250}
          style={this.props.style}
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
                primaryText="My Topograms"
                onClick={() => this.props.router.push('/topograms')}
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
                  primaryText="Login"
                  onClick={() => this.props.router.push('/login')}
                />
                <MenuItem
                  primaryText="Sign Up"
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
