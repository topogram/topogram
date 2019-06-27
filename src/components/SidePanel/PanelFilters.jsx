import React from 'react'
import PropTypes from 'prop-types'

import { CardText } from 'material-ui/Card'

import NodeCategoriesMenu from '../filters/NodeCategoriesMenu.jsx'
import QueryBox from '../queryBox/QueryBox.jsx'

const PanelFilters = ({
  nodes,
  nodeCategories,
  selectedNodeCategories,
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
          selectedNodeCategories={selectedNodeCategories}
          />
        :
        null
    }
  </CardText>
)

export default PanelFilters
