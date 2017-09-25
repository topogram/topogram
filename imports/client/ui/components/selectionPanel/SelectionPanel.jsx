import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import Subheader from 'material-ui/Subheader';

import SelectedItem from './SelectedItem.jsx'

@ui()
export default class SelectionPanel extends React.Component {

  handleExpandChange = () => {
    this.props.updateUI('selectionPanelVisible', false)
    this.props.updateUI('selectionModeOn', false)
    this.unselectAll()
  }

  unselectAll() {
    this.props.ui.selectedElements.map(el => el.data('selected', false))
    this.props.updateUI('selectedElements', [])
  }

  render() {
    const {
      cy,
      selectedElements,
      selectionPanelVisible,
      selectionModeOn,
    } = this.props.ui;

    const selected = !cy ? null :
      selectedElements.map( (el,i) =>(
        <SelectedItem
          key={`selected-item-${i}`}
          id={el.id()}
          data={el.data()}
          group={el.group()}
          />
      ))

    return (
        <Drawer
          width={250}
          openSecondary={true}
          // docked={false}
          // overlayStyle={{display:'none'}}
          open={selectionPanelVisible || selectionModeOn}
          >
            <Subheader>
              Selected Items
              <IconButton
                onClick={this.handleExpandChange}
                style={{float:'right'}}
                >
                 <ClearIcon />
               </IconButton>
             </Subheader>
            {selected}
        </Drawer>
    );
  }
}
