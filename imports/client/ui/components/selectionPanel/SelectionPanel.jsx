import React from 'react'
import ui from 'redux-ui'

import Drawer from 'material-ui/Drawer';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'

@ui()
export default class FocusPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const {cy, selectedElements} = this.props.ui;

    console.log(cy, selectedElements);
    if(cy) {
      if(selectedElements.length === 1) {
        // select
        var subGraph = selectedElements[0].closedNeighborhood()

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
            </CardText>
          </Card>
        )
    })

    return (
        <Drawer
          width={250}
          openSecondary={true}
          open={this.props.open} >
          {selected}
        </Drawer>
    );
  }
}
