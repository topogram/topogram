import React from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar'

import SearchBox from './SearchBox.jsx'
import UserMenu from './UserMenu.jsx'
import InlineEditField from '../inlineEdit/InlineEditField.jsx'

const styles = {
  TopBar : {
    backgroundColor : 'none'
  },
  toolBarTitle : {
    lineHeight : '1em',
    fontSize: '1.4em',
    paddingTop : '.5em',
    overflow : 'ellipsis'
  }
}

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
  }

  render() {
    // console.log(this.props)
    return (
      <Toolbar style={styles.TopBar} >
        <ToolbarGroup firstChild={true}>
          <IconButton
            onClick={this.props.onHomeButtonClick}
          >
            <NavigationMenu />
          </IconButton>
          <InlineEditField
            defaultValue={this.props.topogram.name}
            _id={this.props.topogram._id}
            collection="topograms"
            field="name"
            promptSnackbar={this.promptSnackbar}
            style={styles.toolBarTitle}
          />
        </ToolbarGroup>
        <SearchBox />

        <UserMenu />
      </Toolbar>
    )
  }
}

TopBar.propTypes = {
  onHomeButtonClick: React.PropTypes.func,
  promptSnackbar: React.PropTypes.func,
  topogram : React.PropTypes.object
}

TopBar.defaultProps = {
  topogram : {
    _id : ''
  }
}


export default TopBar
