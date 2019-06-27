import React from 'react'
import PropTypes from 'prop-types'

import {CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem'

import { colors } from '../../helpers/colors.js'
import { textEllipsis } from '../../helpers/ellipsis.js'

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
  cy,
  selectedElements,
  unselectElement,
  onFocusElement
}) => (
  <CardText style={styles.wrapper}>
    {
      selectedElements.map( (el,i) =>(
        <Chip
          key={`selected-item-${i}`}
          onRequestDelete={() => unselectElement(el)}
          backgroundColor={
            el.group === "nodes" ?
              colors(el.data.group)
            :
              null
          }
          onClick={() => onFocusElement(el)}
          style={styles.chip}
          >
            {
              el.group === "nodes" ?
                textEllipsis(el.data.name, 20)
              :
                textEllipsis(cy.filter(`node[id="${el.data.source}"]`).data('name'), 10) + '->' + textEllipsis(cy.filter(`node[id="${el.data.target}"]`).data('name'), 10)

            }
        </Chip>
      ))
    }
  </CardText>
)

export default SelectionChips
