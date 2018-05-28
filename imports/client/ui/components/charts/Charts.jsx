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
const mountNode = document.getElementById('react-c3js');


@ui()

export default class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCharts : true
    }
  }


render( ) {

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
      bottom: 10,
      maxWidth : '30%',
      minWidth : '25%',
      float : 'left'
    }}
  >
    <CardTitle
      title='Charts'
      titleStyle={{ fontSize : '12pt', lineHeight : '1em' }}
    />
    <C3Chart data={data}  
    />
    </Card>


)
}

}
