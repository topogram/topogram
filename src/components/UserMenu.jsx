import React, { PropTypes } from 'react'

// import { messages } from '../../../i18n.js'

import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Home from 'material-ui/svg-icons/action/home'

import About from './About.jsx'
import UserNameEdit from './users/UserNameEdit.jsx'

export default class UserMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open : false,
      userNameOpen :false
     }
  }

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
        <span>
          <UserNameEdit
            userName={this.props.user.username}
            open={this.state.userNameOpen}
            handleClose={() => this.setState({userNameOpen : false})}
            />

          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            style={this.props.style}
            open={this.state.open}
            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
            // onClick={() => this.setState({open : true})}
            onRequestChange={()=> this.setState({open : !this.state.open})}
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
                <span>
                  <Subheader>
                    {
                      this.props.user.username
                    }
                  </Subheader>
                  <MenuItem
                    primaryText="Change Username"
                    onClick={() => this.setState({
                      userNameOpen : true,
                      open: false
                    })}
                  />
                  <MenuItem
                    primaryText="Sign out"
                    onClick={() => this.logout()}
                  />
                </span>
            }


          </IconMenu>
        </span>
      )
  }
}

// initalLocale: React.PropTypes.oneOf(appLocales),
