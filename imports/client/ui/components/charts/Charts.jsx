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
  static propTypes = {
    //edges : PropTypes.array.isRequired,
    // isolateMode : PropTypes.bool,
    // handleClickGeoElement : PropTypes.func.isRequired,
    // onFocusElement : PropTypes.func.isRequired,
    // onUnfocusElement : PropTypes.func.isRequired
  }

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
    //edges

   } = this.props

   const { cy } = this.props.ui

//    function sizeObj(obj) {
//   return Object.keys(obj).length;
// }
//##FILTERNODES AND CREATE DATASET
  if (this.props.ui.cy && !!this.props.ui.cy.initrender ){console.log("THISCY",this.props.ui.cy)}
   if (this.props.ui.cy && !!this.props.ui.cy.initrender) {

        this.nodes=this.props.ui.cy.filter('node')
        console.log(this.nodes.length);
        var edges =[]
        var j =0
        for ( ;  j < this.nodes.length ; j++) {
          //console.log(this.nodes[j]["_private"])
           edges.push(this.nodes[j]["_private"])
        }
        var j =0
        var edges2 =[]
        console.log(edges.length);
         for (;  j < edges.length ; j++)
         {
         //console.log(edges[j]["edges"])//edges ={edges}
         edges2.push(edges[j]["edges"])
       }

       var edges3 =[]
       var edgtmp =[]
       console.log(edges2.length);
        for (var k =0;  k < edges2.length ; k++)
        {
          console.log("k",k);
          console.log("2K",edges2[k]);
          edgtmp = edges2[k]
          var edgesbk= edges3
          console.log("edgtmp",edgtmp.keys())
           edges3 = edgesbk.concat(edgtmp)
          console.log("edges3",edges3)
        }


//         edges.push(this.nodes.map((n) =>{
//          return(
//             n._private.edges
    //
    //     )
    //     }
    //   )
    // )

        console.log("THISEDGES",edges)
        console.log("THISEDGES2",edges2)
        console.log("THISEDGES3",edges3)



   const nodesforCharts = this.nodes.map((n,i) => {

     return (


           { 'data' : n._private.data,
             'key':`node-${i}`,
              'center': {'lat':n._private.data.lat,'lng' :n._private.data.lng},
              'color' : n._private.data.selected ? 'yellow' : n._private.data.color

           }
     )
   }
   )
   // const edgesforCharts = this.edges.map((n,i) => {
   //
   //   return (
   //
   //
   //         { 'data' : n._private.data,
   //           'key':`edge-${i}`,
   //          //  'center': {'lat':n._private.data.lat,'lng' :n._private.data.lng},
   //          //  'color' : n._private.data.selected ? 'yellow' : n._private.data.color
   //
   //         }
   //   )
   // }
   // )

  console.log("NODES",nodesforCharts)
  //console.log("EDGES",edgesforCharts)
  //console.log(this.nodes[i]["_private"]["data"])
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
