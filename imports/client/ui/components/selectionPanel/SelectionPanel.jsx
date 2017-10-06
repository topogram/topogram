import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'


import NodeCategoriesMenu from '../filters/NodeCategoriesMenu.jsx'
import QueryBox from '../queryBox/QueryBox.jsx'

import SelectedEdge from './SelectedEdge.jsx'
import SelectedNode from './SelectedNode.jsx'

@ui()
export default class SelectionPanel extends React.Component {

  handleExpandChange = () => {
    this.props.updateUI('filterPanelIsOpen', false)
  }

  handleClearSelection = () => {
    this.props.unselectAllElements()
  }

  render() {

    const {
      selectElement,
      nodes,
      nodeCategories
    } = this.props

    const {
      cy,
      selectedElements,
      filterPanelIsOpen,
    } = this.props.ui

    const selected = !cy ? null :
      selectedElements.map( (el,i) =>(
        el.group === 'nodes' ?
          <SelectedNode
            key={`selected-item-${i}`}
            name={el.data.name}
            lat={el.data.lat}
            lng={el.data.lng}
            notes={el.data.notes}
          />
          :
          <SelectedEdge
            key={`selected-item-${i}`}
            source={cy.filter(`node[id="${el.data.source}"]`)}
            target={cy.filter(`node[id="${el.data.target}"]`)}
            notes={el.data.notes}
          />
      ))

    return (
      <Drawer
        width={250}
        openSecondary={true}
        // docked={false}
        // overlayStyle={{display:'none'}}
        open={filterPanelIsOpen}
        >
        <Subheader>
            Filter & Selections
          <IconButton
            onClick={this.handleExpandChange}
            style={{ float:'right' }}
          >
            <ClearIcon />
          </IconButton>
        </Subheader>

        { !!nodeCategories.length ?
          <NodeCategoriesMenu
          nodeCategories={nodeCategories}
          />
          :
          null
        }

        <Divider />
        <MenuItem
          primaryText="Clear Selection"
          onClick={this.handleClearSelection}
          />
        <MenuItem
          animation={() => null}
          primaryText={
            <QueryBox
            nodes={nodes}
            selectElement={selectElement}
            />
          }
          />

      {/* <MenuItem
        primaryText="Selection Mode"
        checked={filterPanelIsOpen}
      /> */}

        {selected}
      </Drawer>
    )
  }
}
