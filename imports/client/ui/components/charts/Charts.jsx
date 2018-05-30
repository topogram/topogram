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
console.log("THISUI=",this.props.ui);
//    function sizeObj(obj) {
//   return Object.keys(obj).length;
// }
//##FILTERNODES AND CREATE DATASET
  // if (this.props.ui.cy && !!this.props.ui.cy.initrender ){console.log("THISCY",this.props.ui.cy)}
   if (this.props.ui.cy && !!this.props.ui.cy._private.initrender) {
//EASY NODES
        this.nodes=this.props.ui.cy.filter('node')
        //console.log(this.nodes.length);
//HARD EDGES
        var edges =[]
        var j =0
        for ( ;  j < this.nodes.length ; j++) {
          //console.log(this.nodes[j]["_private"])
           edges.push(this.nodes[j]["_private"])
        }
        var j =0
        var edges2 =[]
        //console.log(edges.length);
         for (;  j < edges.length ; j++)
         {
         //console.log(edges[j]["edges"])//edges ={edges}
         edges2.push(edges[j]["edges"])
       }

       var edges3 =[]
       var edgtmp =[]
       //console.log(edges2.length);
        for (var k =0;  k < edges2.length ; k++)
        {
          //console.log("k",k);
          //console.log("2K",edges2[k]);
          edgtmp = edges2[k]
          var edgesbk= edges3
          //console.log("edgtmp",edgtmp.keys())
           edges3 = edgesbk.concat(edgtmp)
          //console.log("edges3",edges3)
        }

        let edges4 = [...new Set(edges3)];


var regenerale= /.*/g;
// 0: "distance : 4205.973563 km  "
// 1: ""
// 2: "source : infinity-hall41-73  target : daniel-street41-73  "
// 3: ""
// 4: "datesource : 2010-12-18T19:00:00  "
// 5: ""
// 6: "datetarget : 2010-12-19T19:00:00  "
// 7: ""
// 8: "group: 6  "
// 9: ""
// 10: " tournée déjà grandement optimisée  "
// 11: ""
// 12: "Distance parcourue pendant le tour: 13762.3555564 km  "
// 13: ""
// 14: "Distance recalculée: 19362.6829578 km  "
// 15: ""
// 16: "Taux d'optimisation -0.406930875931 %  "
// 17: ""
// 18: "counted 1  times"

// 19: ""

      var edgesforCharts = edges4.map((n,i) =>{
          return(
             {data: n._private.data,
             key : `edge-${i}`,
              notes: n._private.data.notes,
              distance : n._private.data.notes.match(regenerale)[0].split(": ")[1].split(" km")[0],
              group: n._private.data.notes.match(regenerale)[8].split(": ")[1].split("  ")[0],

            }

   )
   }
  )


        //console.log("THISEDGES",edges)
        //console.log("THISEDGES2",edges2)
        //console.log("THISEDGES3",edges3)
        //console.log("EDGES:",edgesforCharts)
      //  #YEAH GOT IT
      //\HARD EDGES

//#UNDER PRIVATE.DATA FOR NODES AND DATA FOR EDGE

   const nodesforCharts = this.nodes.map((n,i) => {

     return (


           { 'data' : n._private.data,
             'key':`node-${i}`,
              'center': {'lat':n._private.data.lat,'lng' :n._private.data.lng},
              'color' : n._private.data.selected ? 'yellow' : n._private.data.color,

              //'notes' :  n._private.data.notes
              //''

           }
     )
   }
   )


//  console.log("NODES",nodesforCharts)
//  console.log("EDGES",edgesforCharts)
  //console.log(this.nodes[i]["_private"]["data"])

  var resweig = nodesforCharts.map((n)=>{
    return(
      n.data.weight
    )

  }
  )
  var resweig2=resweig.reduce(function(prevVal, elem) {
    return prevVal + elem ;
}, 0);

//#WE NEED TO FIGURE OUT HOW OT INSTALL STDLIBs
//ChiSquare Calculation
// var ChiSquare = require( '@stdlib/stats/base/dists/chisquare' ).ChiSquare;
// var chisquare = new ChiSquare( resweig );
// var mu = chisquare.mean;
// console.log("mu",mu);

//#SO WE SWITCH TO js-statsXXX NOPE Statistical-js
const statistical = require('statistical-js');




  resweig.unshift('nodes weight')
//      console.log("NODESWEIGHT",resweig)
//console.log("NODESWEIGHT2",resweig2)

}


//IDEM FOR EDGES SO THAT WE HAVE DATAS FOR EDGES AND NODES


  // NOW DATA's HERE IS AN EXAMPLE:
  // let data = {
  //   columns: [
  //     ['nodes Weight', 30, 200, 100, 400, 150, 250],
  //     ['Tour distances', 50, 20, 10, 40, 15, 25]
  //   ]
  // };

  let data = {
    columns: [
      this.props.ui.cy && !!this.props.ui.cy.initrender ?  resweig : ['nodes weight', 30, 200, 100, 400, 150, 250]
    ]
  , type :"bar"


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
