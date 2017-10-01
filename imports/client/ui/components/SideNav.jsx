import React from 'react'
import ui from 'redux-ui'

import FlatButton from 'material-ui/FlatButton'
import { Toolbar } from 'material-ui/Toolbar'
import { Card, CardTitle, CardHeader } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import MenuItem from 'material-ui/MenuItem'

import QueryBox from './queryBox/QueryBox.jsx'
import NetworkOptions from './networkOptions/NetworkOptions.jsx'
import GeoMapOptions from './geoMapOptions/GeoMapOptions.jsx'

import Settings from './settings/Settings.jsx'

@ui()
class SideNav extends React.Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggleSelectionMode = () => {
    this.props.updateUI('selectionModeOn', !this.props.ui.selectionModeOn)
  }

  handleExpandChange = () => {
    const { open } = this.state
    this.setState({ open : !open })
  }

  render() {
    const { nodes, edges, authorIsLoggedIn, userId } = this.props
    const { selectionModeOn } = this.props.ui

    const settings =
      authorIsLoggedIn ?
        (<Settings
          topogramId={this.props.topogramId}
          topogramTitle= {this.props.topogramTitle}
          topogramSharedPublic={this.props.topogramIsPublic}
          router={this.props.router}
        />)
        :
        null

    return (
      <Card
        style={{ maxWidth : '30%', minWidth : '25%', float : 'left' }}
        onExpandChange={this.handleExpandChange}
      >
        <CardTitle
          showExpandableButton={true}
          title={this.props.topogramTitle}
          titleStyle={{ fontSize : '14pt', lineHeight : '1em' }}
          subtitle={`${nodes.length} nodes, ${edges.length} edges`}
        />

        { this.state.open ?
          <span>
            {/* <QueryBox
              nodes={nodes}
              edges={edges}
            /> */}
            <GeoMapOptions/>
            <NetworkOptions/>
            <MenuItem
              primaryText="Selection Mode"
              onClick={this.handleToggleSelectionMode}
              checked={selectionModeOn}
            />
            {settings}
          </span>
          :
          null
        }

      </Card>
    )
  }
}

export default SideNav
