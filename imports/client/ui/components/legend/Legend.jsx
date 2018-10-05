import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import d3 from 'd3'
import { CircleMarker } from 'react-leaflet'


const LEGEND_DIV_ID = "legend"
const divLegendStyle = {
  //position: 'fixed',
  top: '0',
  //zIndex : -1,
  fontSize: "60%"
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

      title='BandsTour (Beta.1) GPL V3 by Gregory Bahde'
      titleStyle={{ fontSize : '10pt', lineHeight : '1em',  fontWeight: 'bold' }}

    />

    <CardTitle

      title='Network Legends'
      titleStyle={{ fontSize : '8pt', lineHeight : '1em' }}

    />



<table>
    <tbody  style= {{fontSize: "8pt"}}>
<tr>
<td>
    <div
    style= {{
      boxSizing: 'border-box',
       border: '3px solid red',
       background: 'red',
        borderRadius: '10px',
         width: '6px',
          height: '6px',
        }}
    />
</td>
<td>
<div style={{paddingLeft: "10px"}} > 1 date</div>
</td>
</tr>
<tr>
<td>
    <div
    style= {{
      boxSizing: 'border-box',
       border: '3px solid red',
        borderRadius: '10px',
        background: 'red',
         width: '20px',
          height: '20px',
        }}
    />
</td>
<td>
  <div style={{paddingLeft: "10px"}}>
  10 dates
  </div>
</td>
</tr>
    </tbody>
</table>
    <CardTitle

      title='Map'
      titleStyle={{ fontSize : '10pt', lineHeight : '1em' }}

    />
  <div  style= {{fontSize: "9pt"}}> l'échelle de la carte est visible en bas à droite de celle-ci</div>
    <table>
    <tbody  style= {{fontSize: "8pt"}}>

    <tr>
    <td>
        <div
        style= {{
          boxSizing: 'border-box',
           border: '3px solid red',

            borderRadius: '10px',
             width: '15px',
              height: '15px',
            }}
        />
    </td>
    <td>
    <div> 1 date</div>
    </td>
    </tr>
    <tr>
    <td>
        <div
        style= {{
          boxSizing: 'border-box',
           border: '3px solid red',
            borderRadius: '10px',

             width: '20px',
              height: '20px',
            }}
        />
    </td>
    <td>
      <div>
      10 dates
      </div>
    </td>
    </tr>
    <tr>
    <td>
        <div>
        <svg
        style= {{height:"5px", width:"40px"}}>
    <line x1="0" y1="0" x2="40" y2="0"
    style={{stroke:"rgb(255,0,0)",strokeWidth:4}} />
    </svg>
        </div>
    </td>
    <td>
      <div style={{paddingLeft: "10px"}}>
    tournée ni optimisée ni optimisable
      </div>
    </td>
    </tr>
    <tr>
    <td>
        <div>
        <svg
        style= {{height:"5px", width:"40px"}}>
 <line x1="0" y1="0" x2="40" y2="0"
  style={{stroke:"rgb(255,0,0)",strokeWidth:4, strokeDasharray:"9 2"}} />
</svg>
        </div>
    </td>
    <td>
      <div style={{paddingLeft: "10px"}}>
    tournée grandement optimisable (D2)
      </div>
    </td>
    </tr>
    <tr>
    <td>
        <div>
        <svg
        style= {{height:"5px", width:"40px"}}>
 <line x1="0" y1="0" x2="40" y2="0"
  style={{stroke:"rgb(255,0,0)",strokeWidth:4, strokeDasharray:"5 4"}} />
</svg>
        </div>
    </td>
    <td>
      <div style={{paddingLeft: "10px"}}>
    tournée optimisable (D1)
      </div>
    </td>
    </tr>
    <tr>
    <td>
        <div>
        <svg
        style= {{height:"5px", width:"40px"}}>
 <line x1="0" y1="0" x2="40" y2="0"
  style={{stroke:"rgb(255,0,0)",strokeWidth:4,strokeDasharray:"5 2 2 5 2 2 5"}} />
</svg>
        </div>
    </td>
    <td>
      <div style={{paddingLeft: "10px"}}>
    tournée déjà grandement optimisée (D-2)
      </div>
    </td>
    </tr>
    <tr>
    <td>
        <div>
        <svg
        style= {{height:"5px", width:"40px"}}>
 <line x1="0" y1="0" x2="40" y2="0"
  style={{stroke:"rgb(255,0,0)",strokeWidth:4, strokeDasharray:"7 1 7 7 1 7 7 1 7"}} />
</svg>
        </div>
    </td>
    <td>
      <div style={{paddingLeft: "10px"}}>
    tournée déjà optimisée (D-1)
      </div>
    </td>
    </tr>
    </tbody>
    </table>



</div>





    </Card>


)
}
}
}
