import React, { PropTypes } from 'react'
import { CardTitle } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'

import NodeCategoriesMenu from '../filters/NodeCategoriesMenu.jsx'

const PanelFilters = ({nodeCategories}) => (
  <span>
  <Subheader>Filters</Subheader>
    {
      !!nodeCategories.length ?
        <NodeCategoriesMenu
          nodeCategories={nodeCategories}
          />
        :
        null
    }
  </span>
)

export default PanelFilters
