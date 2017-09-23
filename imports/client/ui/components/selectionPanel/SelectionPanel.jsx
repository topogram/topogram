import React from 'react'
import ui from 'redux-ui'

import Markdown from 'react-remarkable'
import 'github-markdown-css'
import Drawer from 'material-ui/Drawer';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'

@ui()
export default class FocusPanel extends React.Component {

  handleToggle = () => this.props.updateUI(
    'selectionPanelPinned', !this.props.ui.selectionPanelPinned);

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
          <Card
            initiallyExpanded={ i===0 } // expand the first
            key={i}
            >
            <CardHeader
              title={element.data.name}
              subtitle={element.group}
              actAsExpander={true}
              showExpandableButton={true}
              />
            <CardText expandable={true}>
              <p>lat/lng : {`${element.data.lat}/${element.data.lng}`}</p>
              {
                element.data.notes ?
                <Markdown source={element.data.notes} />
                :
                null
              }
            </CardText>
          </Card>
        )
    })

    return (
        <Drawer
          width={250}
          openSecondary={true}
          open={selectionPanelVisible || selectionPanelPinned} >
          {selected}
        </Drawer>
    );
  }
}
