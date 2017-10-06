import React, {PropTypes} from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import IconButton from 'material-ui/IconButton'

import SidePanelActions from './SidePanelActions.jsx'
import PanelDescription from './PanelDescription.jsx'
import PanelFilters from './PanelFilters.jsx'
import PanelEdit from './PanelEdit.jsx'

import TitleBox from '../TitleBox.jsx'
import UserMenu from '../UserMenu.jsx'


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
      onFocusElement,
      onUnfocusElement,
      selectElement,
      unselectElement,
      authorIsLoggedIn,
      router,
      nodeCategories
    } = this.props

    const {
      cy,
      selectedElements,
      filterPanelIsOpen,
      focusElement,
      geoMapVisible
    } = this.props.ui

    // const selected = !cy ? null :
    //   selectedElements.map( (el,i) =>(
    //     <Chip
    //       key={`selected-item-${i}`}
    //       onRequestDelete={() => unselectElement(el)}
    //       backgroundColor={colors(el.data.group)}
    //       onClick={() => onFocusElement(el)}
    //       >
    //         {textEllipsis(el.data.name, 20)}
    //     </Chip>
    //
    //   ))

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
            <PanelEdit
              geoMapVisible={geoMapVisible}
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
