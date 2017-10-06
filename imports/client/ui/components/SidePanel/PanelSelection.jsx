import React, { PropTypes } from 'react'

import {Card} from 'material-ui/Card'
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem'

import { colors } from '/imports/client/helpers/colors.js'
import { textEllipsis } from '/imports/client/helpers/ellipsis.js'

import SelectedItem from '../selectionItem/SelectedItem.jsx'

const PanelSelection = ({
  selectedElements,
  cy,
  nodes,
  selectElement,
  focusElement,
  handleClearSelection,
  onUnfocusElement
}) => (
  <Card>
    <QueryBox
    nodes={nodes}
    selectElement={selectElement}
    />
  {
    selectedElements.map( (el,i) =>(
      <Chip
        key={`selected-item-${i}`}
        onRequestDelete={() => unselectElement(el)}
        backgroundColor={colors(el.data.group)}
        onClick={() => onFocusElement(el)}
        >
          {textEllipsis(el.data.name, 20)}
      </Chip>
    ))
  }
  {
    !! selectedElements.length ?
    <MenuItem
      primaryText="Clear Selection"
      leftIcon={<ClearIcon />}
      onClick={handleClearSelection}
      style={{
        bottom:0,
        position: 'fixed',
        width: '100%'
      }}
      />
    :
    null
  }
  {
    !!focusElement ?
    <SelectedItem
      key={focusElement.data.id}
      el={focusElement}
      cy={cy}
      onUnfocusElement={onUnfocusElement}
    />
    :
    null
  }
  </Card>
)

export default PanelSelection
