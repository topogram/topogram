import React, { PropTypes } from 'react'

import SelectedItem from './SelectedItem.jsx'

const SelectedNode = ({ name, lat, lng, notes }) => (
  <SelectedItem
    title={name}
    group="Nodes"
    notes={notes}
  >
    <p>lat/lng : {`${lat}/${lng}`}</p>
  </SelectedItem>
)

SelectedNode.propTypes = {
  name : PropTypes.string,
  lat : PropTypes.number,
  lng : PropTypes.number,
  notes : PropTypes.string
}

export default SelectedNode
