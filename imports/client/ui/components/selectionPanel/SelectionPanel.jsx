import React from 'react'
import ui from 'redux-ui'

import Markdown from 'react-remarkable'
import 'github-markdown-css'
import Drawer from 'material-ui/Drawer';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'

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
          <Card
            expanded={ true }
            onExpandChange={() => this.handleExpandChange()}
            >
            <CardHeader
              showExpandableButton={true}
              title="Selected Items"
              closeIcon={<ClearIcon />}
              openIcon={<ClearIcon />}
              />
              <CardText expandable={true}>
                {selected}
              </CardText>
          </Card>
        </Drawer>
    );
  }
}
