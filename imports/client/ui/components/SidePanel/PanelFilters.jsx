import React, { PropTypes } from 'react'

import { CardText } from 'material-ui/Card'

import NodeCategoriesMenu from '../filters/NodeCategoriesMenu.jsx'
import QueryBox from '../queryBox/QueryBox.jsx'

const PanelFilters = ({
  nodes,
  nodeCategories,
  selectElement
}) => (
  <CardText>
    <QueryBox
      nodes={nodes}
      selectElement={selectElement}
      />
    {
      !!nodeCategories.length ?
        <NodeCategoriesMenu
          nodeCategories={nodeCategories}
          />
        :
        null
    }
  </CardText>
)

export default PanelFilters
