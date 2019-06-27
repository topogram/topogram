import React from 'react'
import store from '../../store'
import PropTypes from 'prop-types'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader'

import LensIcon from 'material-ui/svg-icons/image/lens'
import { colors } from '../../helpers/colors.js'


export default class NodeCategoriesMenu extends React.Component {

  static propTypes = {
    nodeCategories : PropTypes.array,
    selectedNodeCategories : PropTypes.array
  }

  handleSelectNodeCategory = (category) => {
    const selectedNodeCategories = [... this.props.selectedNodeCategories]

    let i = selectedNodeCategories.indexOf(category)
    if (i > -1) selectedNodeCategories.splice(i, 1)
    else selectedNodeCategories.push(category)

    store.dispatch({
      type: 'SET_NODES_CATEGORIES',
      selectedNodeCategories
    })
  }

  render() {

    const {nodeCategories} = this.props
    const {selectedNodeCategories} = this.props

    const menuItems = nodeCategories.map((d,i) => (
      <MenuItem
        value={d}
        key={d}
        insetChildren={true}
        primaryText={d.charAt(0).toUpperCase() + d.slice(1)}
        onClick={() => this.handleSelectNodeCategory(d)}
        leftIcon={<LensIcon color={colors(d)}/>}
        style={
          !selectedNodeCategories.includes(d) ? { color : '#ccc'} : {}
        }
      />
    ))

    return (
        <Menu
          desktop={true}
          style={{maxWidth : '100%'}}
          // multiple={true}
          // value={selectedNodeCategories}
          // floatingLabelText={`Selected categories (${selectedNodeCategories.length}/${nodeCategories.length})`}
          // floatingLabelFixed={true}
        >
          <Subheader>Categories</Subheader>
            {menuItems}
          <Divider/>
        </Menu>
    )
  }
}
