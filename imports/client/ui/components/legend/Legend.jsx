import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import d3 from 'd3'
import { CircleMarker } from 'react-leaflet'


const LEGEND_DIV_ID = "legend"
const divLegendStyle = {
  //position: 'fixed',
  top: '0',
  //zIndex : -1
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
    maxEdgesWeight,
    height,
    width


   } = this.props

const right = width === '50vw' ? '50vw' : 0
   const { cy } = this.props.ui

  // if (this.props.ui.cy && !!this.props.ui.cy.initrender ){console.log("THISCY",this.props.ui.cy)}
   if (this.props.ui.cy && (this.props.ui.cy._private.initrender == false)) {


  const {
    legendVisible
  } = this.state


return (


  <Card
    style={{
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




    <div
    style= {{
      boxSizing: 'border-box',
       border: '3px solid red',
        borderRadius: '10px',
         width: '10px',
          height: '10px',
        }}
    />


</div>
    </Card>


)
}
}
}
