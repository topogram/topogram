import React, { PropTypes } from 'react'
import ui from 'redux-ui'

import { Card, CardActions, CardTitle } from 'material-ui/Card'

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ContentFilterIcon from 'material-ui/svg-icons/content/filter-list';

// import QueryBox from './queryBox/QueryBox.jsx'
import NetworkOptions from './networkOptions/NetworkOptions.jsx'
import GeoMapOptions from './geoMapOptions/GeoMapOptions.jsx'

import Settings from './settings/Settings.jsx'

@ui()
class SideNav extends React.Component {


  static propTypes = {
    nodes : PropTypes.array,
    edges : PropTypes.array,
    authorIsLoggedIn : PropTypes.bool,
    userId : PropTypes.string,
    topogramId : PropTypes.string,
    topogramTitle : PropTypes.string,
    topogramIsPublic : PropTypes.bool,
    router : PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggleSelectionMode = () => {
    this.props.updateUI('filterPanelIsOpen', !this.props.ui.filterPanelIsOpen)
  }

  handleExpandChange = () => {
    const { open } = this.state
    this.setState({ open : !open })
  }

  render() {
    const {
      nodes,
      edges,
      authorIsLoggedIn,
      nodeCategories,
      topogramId,
      topogramTitle,
      topogramIsPublic,
      selectElement
    } = this.props

    const {
      filterPanelIsOpen,
      geoMapVisible
    } = this.props.ui

    const settings =
      authorIsLoggedIn ?
        (
          <Settings
            topogramId={topogramId}
            topogramTitle= {topogramTitle}
            topogramSharedPublic={topogramIsPublic}
            router={this.props.router}
          />
        )
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
            { geoMapVisible ? <GeoMapOptions/> : null }
            <NetworkOptions/>
            {settings}
          </span>
          :
          null
        }

        <CardActions>
          <IconButton>
            <ActionHome />
          </IconButton>
          <IconButton
            onClick={this.handleToggleSelectionMode}
            >
            <ContentFilterIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default SideNav
