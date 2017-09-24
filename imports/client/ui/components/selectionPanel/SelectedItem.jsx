import React from 'react'

export default class SelectedItem extends React.Component {

  render() {
    const {name, notes, lat, lng} = this.props.data

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
        {this.props.group}
        {name}
        <p>lat/lng : {`${lat}/${lng}`}</p>
        {
            notes ?
            <Markdown source={notes} />
            :
            null
          }
      </div>
    )
  }
}
