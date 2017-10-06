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



  </Card>
)

export default PanelSelection
