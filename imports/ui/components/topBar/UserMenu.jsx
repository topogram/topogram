import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import About from '../About.jsx'

class UserMenu extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton touch={true}>
            <NavigationExpandMoreIcon />
          </IconButton>
        }
      >
        <MenuItem primaryText="Download" />
        <MenuItem primaryText="More Info" />
        <About />
      </IconMenu>
    )
  }
}

export default UserMenu
