import React from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import { Toolbar } from 'material-ui/Toolbar'

import SearchBox from './SearchBox.jsx'
import UserMenu from './UserMenu.jsx'
import InlineEditField from '../inlineEdit/InlineEditField.jsx'

const styles = {
  TopBar : {
    backgroundColor : 'none'
  }
}

class TopBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Toolbar style={styles.TopBar} >
        <IconButton
          onClick={this.props.onHomeButtonClick}
        >
          <NavigationMenu />
        </IconButton>

        <InlineEditField
          defaultValue="Topogram"
          _id="uXW8mNfFgWpaMdao6"
          collection="topograms"
          field="name"
          promptSnackbar={this.promptSnackbar}
        />

        <SearchBox />
        <UserMenu />
      </Toolbar>
    )
  }
}

TopBar.propTypes = {
  onHomeButtonClick: React.PropTypes.func,
  promptSnackbar: React.PropTypes.func
}


export default TopBar
