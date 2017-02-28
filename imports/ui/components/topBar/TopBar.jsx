import React from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

import QueryBox from './QueryBox.jsx'
import UserMenu from './UserMenu.jsx'


const styles = {
  topBar : {
    backgroundColor : 'rgba(0,0,0,.2)'
  },
  buttonToggleSideNav : {
    marginRight: '200px'
  }
}

class TopBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    
    const
      nodes = this.props.elements.nodes,
      edges = this.props.elements.edges

    return (
      <Toolbar style={styles.topBar} >
        <IconButton
          onClick={this.props.onHomeButtonClick}
          style={styles.buttonToggleSideNav}
        >
          <NavigationMenu />
        </IconButton>
          <QueryBox
            nodes={nodes}
            edges={edges}
          />
        <UserMenu />
      </Toolbar>
    )
  }
}

TopBar.propTypes = {
  onHomeButtonClick: React.PropTypes.func,
  promptSnackbar: React.PropTypes.func,
  topogram : React.PropTypes.object,
  elements : React.PropTypes.object
}

TopBar.defaultProps = {
  topogram : {},
  elements : { nodes : [], edges : [] }
}


export default TopBar
