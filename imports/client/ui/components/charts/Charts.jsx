import React, { PropTypes } from 'react'
import ui from 'redux-ui'


import C3Chart from 'react-c3js';
import './c3.css';



@ui()

class Charts extends React.Component {
render() {


const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ]
};
const mountNode = document.getElementById('react-c3js');

const {
  chartsVisible
} = this.state

//const mountNode = document.getElementById('react-c3js');


return (

  <Card
    //sstyle={styleTimeLine}
  >

  <div>

    <div>
      <Chart data={data} />
    </div>


</div>
</Card>
)
}

}

export default Charts
