import React from 'react'
import IconButton from 'material-ui/IconButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import SearchBox from './SearchBox.jsx'
import UserMenu from './UserMenu.jsx'


class TopBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Toolbar>
        <IconButton
          onClick={this.props.onHomeButtonClick}
        >
          <NavigationMenu />
        </IconButton>
        <ToolbarTitle
          text="Topogram"
        />
        <SearchBox />
        <UserMenu />
      </Toolbar>
    )
  }
}

TopBar.propTypes = {
  onHomeButtonClick: React.PropTypes.func
}


export default TopBar
