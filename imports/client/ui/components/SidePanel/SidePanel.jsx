import React, {PropTypes} from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import IconButton from 'material-ui/IconButton'

import SidePanelActions from './SidePanelActions.jsx'
import PanelDescription from './PanelDescription.jsx'
import PanelFilters from './PanelFilters.jsx'
import PanelSettings from './PanelSettings.jsx'

import TitleBox from '../titlebox/TitleBox.jsx'
import UserMenu from '../UserMenu.jsx'
import './SidePanel.css'

@ui()
export default class SidePanel extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      panelName : 'main'
    }
  }

  handleExpandChange = () =>
    this.props.updateUI('filterPanelIsOpen', false)

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
      hasCharts,
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
      filterPanelIsOpen,
      focusElement,
      geoMapVisible,
      chartsVisible,
      legendVisible
    } = this.props.ui

    return (
      <Drawer
        containerStyle={{

          boxShadow: '1px 1px 8px  #000',
          border: '1px solid #222',
          backgroundColor: 'rgba(69,90,100 ,0.9)',
          color:'#F2EFE9',
         //margin: '20px 2px',

         //align: 'left',
         //marginBottom: '10px',
         borderTopLeftRadius: '20px',
         borderBottomLeftRadius: '20px',
         //padding:"2px 2px 15px 15px ",
         transitionEnabled: "true",}}
        width={220}
        height={10}
        openSecondary={true}
        open={filterPanelIsOpen}

        >

        <IconButton
          onClick={this.handleExpandChange}
          style={{ float:'right', zIndex : 20000 }}
          >
            <ClearIcon color='#F2EFE9' />
        </IconButton>

        <SidePanelActions
          className={"sidepandiv"}
          style={{backgroundColor: '#D4E6CC!important', color:'rgb(242, 239, 233)'}}

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
              hasCharts={hasCharts}
              hasTimeInfo={hasTimeInfo}
              hasGeoInfo={hasGeoInfo}
              authorIsLoggedIn={authorIsLoggedIn}
              topogramId={topogram._id}
              topogramTitle={topogram.title}
              topogramIsPublic={topogram.sharedPublic}
              router={router}
              />
            :
            null
        }

      </Drawer>
    )
  }
}
