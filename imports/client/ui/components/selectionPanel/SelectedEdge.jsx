import React from 'react'
import SelectedItem from './SelectedItem.jsx'

const SelectedEdge = ({ source, target, notes, children }) => (
  <SelectedItem
    title={`${source.data('name')} -> ${target.data('name')}`}
    group="Edges"
  />
)

export default SelectedEdge
