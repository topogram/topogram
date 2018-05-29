import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { Card, CardTitle, CardActions } from 'material-ui/Card'




import C3Chart from 'react-c3js';
import './c3.css';


const CHARTS_DIV_ID = "charts"
const divChartsStyle = {
  position: 'fixed',
  top: '0',
  zIndex : -1
}
//const mountNode = document.getElementById('react-c3js');


@ui()

export default class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCharts : true
    }
  }



render( ) {
  const {
    topogramId,
    nodes,
    edges

   } = this.props

   const { cy } = this.props.ui

//##FILTERNODES AND CREATE DATASET
   if (this.props.ui.cy){console.log(this.props.ui.cy.filter('node'))}
   if (this.props.ui.cy){this.nodes=this.props.ui.cy.filter('node')

for (var i = 0; i < this.nodes.length; i++) {
  console.log(this.nodes[i]["_private"]["data"])
  ;}
}

//IDEM FOR EDGES SO THAT WE HAVE DATAS FOR EDGES AND NODES

  let data = {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ]
  };


const {
  chartsVisible
} = this.state

//const mountNode = document.getElementById('react-c3js');

return (


  <Card
    style={{
      //top:100,
      //bottom: -120,

      maxWidth : '50%',
      minWidth : '20%',


      float : 'left',
      //zDepth: -10000,
      border : 10,
      position: 'relative',

      zIndex: -1
    }}
  >
    <CardTitle

      title='Charts'
      titleStyle={{ fontSize : '12pt', lineHeight : '1em' }}

    />
    <C3Chart
    data={data}

    style={{

    size: { width :10}
    }}
    />
    </Card>


)
}

}
