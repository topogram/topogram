import React from 'react'
import ui from 'redux-ui'

import Markdown from 'react-remarkable'
import 'github-markdown-css'
import Drawer from 'material-ui/Drawer';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'

@ui()
export default class SelectionPanel extends React.Component {

  handleExpandChange = () => {
    this.props.updateUI('selectionPanelVisible', false)
    this.props.updateUI('selectionPanelPinned', false)
  }

  render() {
    const {cy, selectedElements, selectionPanelVisible, selectionPanelPinned} = this.props.ui;

    // console.log(cy, selectedElements);

    if(cy) {
      if(selectedElements.length === 1) {

        // select
        let el = selectedElements[0];
        const subGraph = el.group() === 'nodes' ?
          el.closedNeighborhood()
          :
          el.connectedNodes().add(el)

        // make only the focus selectable
        cy.nodes().hide()
        cy.edges().hide()
        subGraph.show()

      } else {
        // show everything
        cy.nodes().show()
        cy.edges().show()
      }
    }

    const selected = selectedElements
      .map( (e,i) => {
        let element = e.json()
        return (
          <div key={i}>
                {element.data.name}
                {element.group}
                <p>lat/lng : {`${element.data.lat}/${element.data.lng}`}</p>
                {
                  element.data.notes ?
                  <Markdown source={element.data.notes} />
                  :
                  null
                }
          </div>
        )
    })

    return (
        <Drawer
          width={250}
          openSecondary={true}
          // docked={false}
          // overlayStyle={{display:'none'}}
          open={selectionPanelVisible || selectionPanelPinned}
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
