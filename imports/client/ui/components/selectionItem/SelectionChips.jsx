import React, { PropTypes } from 'react'

import {CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem'

import { colors } from '/imports/client/helpers/colors.js'
import { textEllipsis } from '/imports/client/helpers/ellipsis.js'

import SelectedItem from '../selectionItem/SelectedItem.jsx'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const SelectionChips = ({
  selectedElements,
  selectElement,
  unselectElement,
  onFocusElement
}) => (
  <CardText style={styles.wrapper}>
    {
      selectedElements.map( (el,i) =>(
        <Chip
          key={`selected-item-${i}`}
          onRequestDelete={() => unselectElement(el)}
          backgroundColor={colors(el.data.group)}
          onClick={() => onFocusElement(el)}
          style={styles.chip}
          >
            {textEllipsis(el.data.name, 20)}
        </Chip>
      ))
    }
  </CardText>
)

export default SelectionChips
