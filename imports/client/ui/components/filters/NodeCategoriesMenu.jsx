import React, {PropTypes} from 'react'
import ui from 'redux-ui'

import MenuItem from 'material-ui/MenuItem'
import Badge from 'material-ui/Badge';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import LensIcon from 'material-ui/svg-icons/image/lens'
import { colors } from '/imports/client/helpers/colors.js'

@ui()
export default class NodeCategoriesMenu extends React.Component {

  static propTypes = {
    nodeCategories : PropTypes.array
  }

  handleSelectNodeCategory = (category) => {
    const selectedNodeCategories = [... this.props.ui.selectedNodeCategories]

    let i = selectedNodeCategories.indexOf(category)
    if (i > -1) selectedNodeCategories.splice(i, 1)
    else selectedNodeCategories.push(category)

    this.props.updateUI('selectedNodeCategories', selectedNodeCategories)
  }

  render() {

    const {nodeCategories} = this.props
    const {selectedNodeCategories} = this.props.ui

    const menuItems = nodeCategories.map((d,i) => (
      <MenuItem
        value={d}
        key={d}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        onClick={() => this.handleSelectNodeCategory(d)}
        checked={selectedNodeCategories.includes(d)}
        rightIcon={<LensIcon color={colors(d)}/>}
      />
    ))

    return (
      <MenuItem
        primaryText={
          <span>
            Node Categories
            <Badge
              badgeContent={selectedNodeCategories.length}
              primary={true}
              />
          </span>
        }
        // secondaryText={}
        menuItems={menuItems}
        rightIcon={<ArrowDropRight />}
        />
    )
  }
}
