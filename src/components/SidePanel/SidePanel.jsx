import React, {PropTypes} from 'react'
import store from '../../store'

import Drawer from 'material-ui/Drawer'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import IconButton from 'material-ui/IconButton'

import SidePanelActions from './SidePanelActions.jsx'
import PanelDescription from './PanelDescription.jsx'
import PanelFilters from './PanelFilters.jsx'
import PanelSettings from './PanelSettings.jsx'


export default class SidePanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      panelName : 'main'
    }
  }

  handleExpandChange = () =>
    store.dispatch({
      type : 'FILTER_PANEL_CLOSE'
    })

  setPanelName = (panelName) => this.setState({panelName})

  handleClearSelection = () => this.props.unselectAllElements()


  render() {

    const {panelName} = this.state

    const {
      topogram,
      nodes,
      edges,
      hasTimeInfo,
      hasGeoInfo,
      onFocusElement,
      onUnfocusElement,
      selectElement,
      unselectElement,
      authorIsLoggedIn,
      user,
      router,
      nodeCategories
    } = this.props

    const {
      cy,
      selectedElements,
      selectedNodeCategories,
      filterPanelIsOpen,
      focusElement,
      timeLineVisible,
      geoMapVisible,
      graphVisible
    } = this.props.ui

    return (
      <Drawer
        width={250}
        openSecondary={true}
        open={filterPanelIsOpen}
        >

        <IconButton
          onClick={this.handleExpandChange}
          style={{ float:'right', zIndex : 20 }}
          >
            <ClearIcon color='#CCC' />
        </IconButton>

        <SidePanelActions
          setPanelName={this.setPanelName}
          user={user}
          router={router}
          />

        {
          panelName === 'main' ?
            <span>
              <PanelFilters
                nodes={nodes}
                nodeCategories={nodeCategories}
                selectElement={selectElement}
                selectedNodeCategories={selectedNodeCategories}
                />
            </span>
            :
            null
        }

        {
          panelName === 'about' ?
            <PanelDescription
              topogram={topogram}
              nodesCount={nodes.length}
              edgesCount={edges.length}
              />
            :
            null
        }

        {
          panelName === 'edit' ?
            <PanelSettings
              geoMapVisible={geoMapVisible}
              timeLineVisible={ timeLineVisible }
              geoMapVisible={ geoMapVisible }
              graphVisible={ graphVisible }
              hasTimeInfo={hasTimeInfo}
              hasGeoInfo={hasGeoInfo}
              />
            :
            null
        }

      </Drawer>
    )
  }
}
