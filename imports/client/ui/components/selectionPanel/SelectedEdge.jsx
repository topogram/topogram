import React, { PropTypes } from 'react'

import SelectedItem from './SelectedItem.jsx'

const SelectedEdge = ({ source, target, notes }) => (
  <SelectedItem
    title={`${source.data('name')} -> ${target.data('name')}`}
    group="Edges"
    notes={notes}
  />
)

SelectedEdge.propTypes = {
  source : PropTypes.func,
  target : PropTypes.func,
  notes : PropTypes.string
}
export default SelectedEdge
