import React from 'react'

import Markdown from 'react-remarkable'
import 'github-markdown-css'

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default class SelectedItem extends React.Component {

  render() {
    console.log(this);
    const {name, notes, lat, lng} = this.props.data
    const {group} = this.props

    //     // select
    //     let el = selectedElements[0];
    //     const subGraph = el.group() === 'nodes' ?
    //       el.closedNeighborhood()
    //       :
    //       el.connectedNodes().add(el)
    //
    //     // make only the focus selectable
    //     cy.nodes().hide()
    //     cy.edges().hide()
    //     subGraph.show()
    //
    //   } else {
    //     // show everything
    //     cy.nodes().show()
    //     cy.edges().show()
    //   }
    return(
      <div>
        <CardHeader
          title={group === 'nodes' ? name : `${this.props.  data.source.name} -> ${this.props.data.target.name}`}
          subtitle={group}
          />
        <CardText>
        {
          group === 'nodes' ?
          <p>lat/lng : {`${lat}/${lng}`}</p>
          :
          null
        }
        {
            notes ?
            <Markdown source={notes} />
            :
            null
          }
        </CardText>
        <Divider/>
      </div>
    )
  }
}
