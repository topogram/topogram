import React, { PropTypes } from 'react'
import ui from 'redux-ui'


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

export class Charts extends React.Component {
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
  <div
    id={CHARTS_DIV_ID}
    style={Object.assign({}, divChartsStyle,{ left, height })}
    className="react-c3js"
  >

    <Chart data={data}  ref="charts"
    />
    </div>


),mountNode
}

}
