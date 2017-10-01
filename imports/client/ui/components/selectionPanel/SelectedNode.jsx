import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card';

import SelectedItem from './SelectedItem.jsx'

const SelectedNode = ({name, lat, lng, children}) => (
  <SelectedItem
    title={name}
    group='Nodes'
    >
      <p>lat/lng : {`${lat}/${lng}`}</p>
  </SelectedItem>
)

export default SelectedNode
