import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import d3 from 'd3'


const LEGEND_DIV_ID = "legend"
const divLegendStyle = {
  position: 'fixed',
  top: '0',
  zIndex : -1
}






@ui()

export default class Legend extends React.Component {
  static propTypes = {
    minWeight : PropTypes.number,
    maxWeight : PropTypes.number

  }






  constructor(props) {
    super(props)
    this.state = {

    }
  }



render() {
  const {
    topogramId,
    nodes,
    edges,
    nodesforLegend,
    edgesforLegend,
    minWeight,
    maxWeight,
    minEdgesWeight,
    maxEdgesWeight


   } = this.props

   const { cy } = this.props.ui

  // if (this.props.ui.cy && !!this.props.ui.cy.initrender ){console.log("THISCY",this.props.ui.cy)}
   if (this.props.ui.cy && (this.props.ui.cy._private.initrender == false)) {


  const {
    legendVisible
  } = this.state


return (


  <Card
    style={{
      //top:100,
      //bottom: -120,

      maxWidth : '50%',
      minWidth : '20%',


      float : 'right',
      //zDepth: -10000,
      border : 10,
      position: 'relative',

      zIndex: -1
    }}
  >
  <div>
    <CardTitle

      title='Legend'
      titleStyle={{ fontSize : '12pt', lineHeight : '1em' }}

    />

    <CardTitle

      title='Network'
      titleStyle={{ fontSize : '10pt', lineHeight : '1em' }}

    />

    </div>
    <div>

    </div>
    </Card>


)
}
}
}
