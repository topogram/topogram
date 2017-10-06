import React, { PropTypes } from 'react'

import { CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'

import NodeCategoriesMenu from '../filters/NodeCategoriesMenu.jsx'
import QueryBox from '../queryBox/QueryBox.jsx'

const PanelFilters = ({
  nodes,
  nodeCategories,
  selectElement
}) => (
  <CardText>
    <Subheader>Filters</Subheader>
    {
      !!nodeCategories.length ?
        <NodeCategoriesMenu
          nodeCategories={nodeCategories}
          />
        :
        null
    }
    <QueryBox
      nodes={nodes}
      selectElement={selectElement}
      />
  </CardText>
)

export default PanelFilters
