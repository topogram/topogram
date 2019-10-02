import React, { PropTypes } from 'react'
import ui from 'redux-ui'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import C3Chart from 'react-c3js';

import './c3.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import d3  from 'd3/d3';
//import { scaleLinear } from 'd3-scale'
//import {schemeCategory10} from 'd3/d3'

//math.sqrt(float(my_nodesdict[idd]["data"].get("weight"))+1) ,
//import 'rc-slider/assets/index.css';
/*APPLYS TO NODES AND EDGES SELECTED ON SCREEN, SO CY IS THE TARGET OF IMPLANT :)*/
const CHARTS_DIV_ID = "charts"
const divChartsStyle = {
  position: 'fixed',
  top: '0',
  zIndex : -1
}
//const mountNode = document.getElementById('react-c3js');

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);



@ui()

class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCharts : true
    }
  }



  static propTypes = {
    minWeight : PropTypes.number,
    maxWeight : PropTypes.number,
    //edges : PropTypes.array.isRequired,
    // isolateMode : PropTypes.bool,
    //handleClickChartNodeElement : PropTypes.func,
    // onFocusElement : PropTypes.func.isRequired,
    // onUnfocusElement : PropTypes.func.isRequired,
    selectElement : PropTypes.func,
    unselectElement : PropTypes.func
  }

  selectElement = (el) => {

    el.data.selected = true

    const { cy } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    cy.filter(filter).data('selected', true)

    this.props.updateUI(
      'selectedElements',
      [...this.props.ui.selectedElements, el]
    )

  }

  unselectElement = (el) => {

    el.data.selected = false

    const { cy, isolateMode } = this.props.ui
    let filter = `${el.group.slice(0,-1)}[id='${el.data.id}']`
    cy.filter(filter).data('selected', false)

    const {selectedElements} = this.props.ui

    const remainingElements = [...
      selectedElements.filter(n =>
        !(
          n.data.id === el.data.id
          &&
          n.group === el.group
        )
      )
    ]

    this.props.updateUI('selectedElements', remainingElements)
    // console.log(remainingElements, isolateMode);

    if(!remainingElements.length && isolateMode)
    this.handleExitIsolateMode()
  }

  unselectAllElements = () => {
    const { cy, selectedElements } = this.props.ui

    cy.elements().data('selected', false)
    selectedElements.forEach(el=> el.data.selected = false)

    this.props.updateUI('selectedElements', [])

  }



  onSliderWChange = (valueWeight) => {
      this.props.updateUI({ //

        valueRangeWeight : valueWeight

       })
       //console.log('VRW',this.props.ui.valueRangeWeight);
     }


   handleClickChartNodeElement(el) {
       const {cy} = this.props.ui
       //console.log("elelel",el);
       //console.log(cy);
       //console.log("FILT",this.props.ui.cy.filter('node'));
       var cyFIL=this.props.ui.cy.filter('node')
       //console.log(cyFIL[0]["_private"]);
       //console.log(cyFIL[1]["_private"]);
       //console.log(cyFIL.length);

       for (var i = 0; i < cyFIL.length; i++)

      {

      var group = 'node'

      //if (node count = el.???:) {


      const filter = `${group}[id='${cyFIL[i]["_private"]["data"]["id"]}']`
      //console.log(filter)
      const cyEl = cy.filter(filter)
      /*console.log("cyEL ",cyEl);
      console.log("cyEL selected",cyEl.data('selected'));
      console.log("cyEL weight",cyEl.data('weight'));
      console.log("cyEL weightsquared",parseInt(cyEl.data('weight')**2));
      console.log("elelel",el['name']);*/
      if (parseInt(cyEl.data('weight')**2) == el['name']) {

        cyEl.data('selected') ?
         this.unselectElement(cyEl.json())
         :
         this.selectElement(cyEl.json())
       }
         //}
      }
     }




render() {
  const {
    topogramId,
    nodes,
    //edges
    nodesforCharts,
    edgesforCharts,
    minWeigh,
    maxWeigh,


   } = this.props















   const { cy, valueRangeWeight } = this.props.ui










//console.log("THISUI=",this.props.ui);
//    function sizeObj(obj) {
//   return Object.keys(obj).length;
// }
//##FILTERNODES AND CREATE DATASET
  // if (this.props.ui.cy && !!this.props.ui.cy.initrender ){console.log("THISCY",this.props.ui.cy)}
   if (this.props.ui.cy && (this.props.ui.cy._private.initrender == false)) {




// console.log(this.props.maxWeight,"this.props.maxWeight-this.props.minWeight",this.props.minWeight);
//      const marksWeight = {}
//      Array(this.props.maxWeight-this.props.minWeight)
//        .fill(0)
//        .map((n,i) => minWeight+i)
//        .forEach(n => marksWeight[n] = n)



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

      const edgesforCharts = edges4.map((n,i) =>{
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
      Math.round(Math.pow(n.data.weight,2),0)
//      n.data.weight
    )

  }
  )

  console.log("NODE WEIGHT LIST/RESULT N",resweig);


var resweigUniquesPoids={}

//var resweigUniquesStr = []
// for (var i = 0; i < resweigUniques.length; i++) {
//   resweigUniquesStr.push(resweigUniques[i].toString())
// }
// var resweigStr = []
// for (var i = 0; i < resweig.length; i++) {
//   resweigUniquesStr.push(resweigUniques[i].toString())
// }
// console.log("resweigUniques",resweigUniques);
// console.log("resweigUniquesStr",resweigUniquesStr);
// console.log("resweigStr",resweigStr);


for (var i = 0; i < resweig.length; i++) {
  // console.log(resweig[i].toString());
  // if (typeof resweig[i].toString() === 'string' || resweig[i].toString() instanceof String)
  // {console.log("string");}


  if (!resweigUniquesPoids.hasOwnProperty(resweig[i].toString()))
  {resweigUniquesPoids[resweig[i].toString()]=1
//  console.log("strTYPE",resweigUniquesPoids[resweig[i].toString()]);
}
else  {
  //console.log(resweigUniquesPoids[resweig[i].toString()]);
  resweigUniquesPoids[resweig[i].toString()]=parseInt(resweigUniquesPoids[resweig[i].toString()])+1
}
// else {
//   console.log("ERROR");
// }
}
console.log("resweigUniquesPoids",resweigUniquesPoids);
var ArrayresweigUniquesPoids=[]
var ArrayresweigUniquesPoidsDATA=[]
var ArrayValresweigUniquesPoids=[]
for (var key in resweigUniquesPoids) {
  ArrayresweigUniquesPoids.push(resweigUniquesPoids[key])
  ArrayresweigUniquesPoidsDATA.push([Number(key),resweigUniquesPoids[key]])

}
//HERE WE FINALLY GET OCCURENCE OF WEIGHT
var resweigUniques = [...new Set(resweig)];
for (var i = 0; i < resweigUniques.length; i++) {
  console.log(resweigUniques[i]);
  resweigUniques[i]=resweigUniques[i].toString().substring(0,5)
}
ArrayresweigUniquesPoidsDATA.sort()
 console.log(resweigUniques);
ArrayValresweigUniquesPoids =Object.keys(resweigUniquesPoids)
 console.log("ArrayresweigUniquesPoids",ArrayresweigUniquesPoids);
 console.log("ArrayValresweigUniquesPoids",ArrayValresweigUniquesPoids);
 console.log("ArrayresweigUniquesPoidsDATA",ArrayresweigUniquesPoidsDATA);



//===============================================================>

  var resweigEdges = edgesforCharts.map((n)=>{
    return(
      n.data.weight
    )

  }
  )

  console.log("EDGE WEIGHT LIST/RESULT N",resweigEdges);


var resweigEdgesUniquesPoids={}

//var resweigUniquesStr = []
// for (var i = 0; i < resweigUniques.length; i++) {
//   resweigUniquesStr.push(resweigUniques[i].toString())
// }
// var resweigStr = []
// for (var i = 0; i < resweig.length; i++) {
//   resweigUniquesStr.push(resweigUniques[i].toString())
// }
// console.log("resweigUniques",resweigUniques);
// console.log("resweigUniquesStr",resweigUniquesStr);
// console.log("resweigStr",resweigStr);


for (var i = 0; i < resweigEdges.length; i++) {
  // console.log(resweig[i].toString());
  // if (typeof resweig[i].toString() === 'string' || resweig[i].toString() instanceof String)
  // {console.log("string");}


  if (!resweigEdgesUniquesPoids.hasOwnProperty(resweigEdges[i].toString()))
  {resweigEdgesUniquesPoids[resweigEdges[i].toString()]=1
//  console.log("strTYPE",resweigUniquesPoids[resweig[i].toString()]);
}
else  {
  //console.log(resweigUniquesPoids[resweig[i].toString()]);
  resweigEdgesUniquesPoids[resweigEdges[i].toString()]=parseInt(resweigEdgesUniquesPoids[resweigEdges[i].toString()])+1
}
// else {
//   console.log("ERROR");
// }
}
//console.log("resweigUniquesPoids",resweigUniquesPoids);
var ArrayresweigEdgesUniquesPoids=[]
var ArrayresweigEdgesUniquesPoidsDATA=[]
for (var key in resweigEdgesUniquesPoids) {
  ArrayresweigEdgesUniquesPoids.push(resweigEdgesUniquesPoids[key])
  ArrayresweigEdgesUniquesPoidsDATA.push([Number(key),resweigEdgesUniquesPoids[key]])
}
//HERE WE FINALLY GET OCCURENCE OF WEIGHT
var resweigEdgesUniques = [...new Set(resweigEdges)];
for (var i = 0; i < resweigEdgesUniques.length; i++) {
  resweigEdgesUniques[i]=resweigEdgesUniques[i]/*.toString().substring(0,5)*/
}
console.log(resweigEdgesUniques);
console.log(ArrayresweigEdgesUniquesPoids);

ArrayresweigEdgesUniquesPoidsDATA.sort()
console.log(ArrayresweigEdgesUniquesPoidsDATA);


//================================================================>
//#WE NEED TO FIGURE OUT HOW OT INSTALL STDLIBs
//ChiSquare Calculation
// var ChiSquare = require( '@stdlib/stats/base/dists/chisquare' ).ChiSquare;
// var chisquare = new ChiSquare( resweig );
// var mu = chisquare.mean;
// console.log("mu",mu);

//#SO WE SWITCH TO js-statsXXX NOPE Statistical-js
//const statistical = require('statistical-js');

  const statistical = require('statistical-js');
  try{
const summaryNodes = statistical.methods.summary(resweig);
const summaryEdges = statistical.methods.summary(resweigEdges);

console.log(" SUMMARY NODES  RESULTS",summaryNodes);
console.log(" SUMMARY EDGES  RESULTS",summaryEdges);
const ttestN = statistical.methods.tTestOneSample(resweig, 4)
console.log("Student NW",ttestN);
const ttestE = statistical.methods.tTestOneSample(resweigEdges, 4)
console.log("Student EW",ttestE);


const distributionType = statistical.methods.poisson;
const distributionTypeEdges = statistical.methods.poisson;

const chiSquaredGoodnessOfFit = statistical.methods.chiSquaredGoodnessOfFit(ArrayresweigUniquesPoids, distributionType, 0.005);
console.log("chi2 Nodes",chiSquaredGoodnessOfFit);
const chiSquaredGoodnessOfFitEdges = statistical.methods.chiSquaredGoodnessOfFit(ArrayresweigEdgesUniquesPoids, distributionTypeEdges, 0.005);
console.log("chi2 Edges",chiSquaredGoodnessOfFitEdges);
}
catch(error)
{//console.log(error);
}
///HERE WE FORMAT DATAS FOR CHART BY ADDIJNG A HEADER TO OUR ARRAYS
  resweigUniques.unshift('nodes weight elements')
  ArrayresweigUniquesPoids.unshift('nodes weight count')
  resweig.unshift('nodes weight')
  resweigEdgesUniques.unshift('edges weight elements')
  ArrayresweigEdgesUniquesPoids.unshift('edges weight count')
  resweigEdges.unshift('edges weight')
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


  const {
    chartsVisible
  } = this.state
/*var colorsNode= scaleLinear(schemeCategory10)
  .domain(ArrayresweigUniquesPoidsDATA)
  .range([5,15])*/
/*  var colorsNode= ['red','green','blue','yellow','black','red']*/
  /*['#2d335b', '#535b2d', '#494949', '#d7d7d7', '9ad4ce']*/
//console.log(colorsNode);
console.log(resweigUniques,"resweigUniques");
  let data = {

    columns:
      (this.props.ui.cy && (this.props.ui.cy._private.initrender==false)) ?  /*[ArrayresweigUniquesPoids]*/ ArrayresweigUniquesPoidsDATA : [['nodes weight', 30, 200, 100, 400, 150, 250]]

      ,
          type: 'donut'/*,

        color:function(d){
                return colorsNode[d.index];
        }*/
        ,
                onclick: (e) => this.handleClickChartNodeElement(e)
                ,


          /*pie: {
            title:{
  text: 'My Title'
}
        }
*/

        }
        let data2 = {

          columns:
            (this.props.ui.cy && (this.props.ui.cy._private.initrender==false)) ?  /*[ArrayresweigUniquesPoids]*/ ArrayresweigEdgesUniquesPoidsDATA : [['edges weight', 30, 200, 100, 400, 150, 250]]

            ,
                type: 'donut',
                /*pie: {
                  title:{
        text: 'My Title'
        }
              }
        */

              }


/*    var firstLegend = d3.select(".c3-title");
    console.log("firstLegend",firstLegend);
    var legendCon = d3.select(firstLegend.node().parentNode);
    legendCon
  .append('text')
  .text('Legend Title')*/
/*  , bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
      }
  ,axis: {
  x: {
label: 'nodes weight',
type: "category",
categories:resweigUniques,
  tick: {
      fit: true,
      multiline: true,
      values: ArrayValresweigUniquesPoids
    },
  },
  y: {
            label: 'number of shows per venue'
        },
}


};*/
if (this.props.ui.cy && (this.props.ui.cy._private.initrender==false)&&data){
//#SO WE SWITCH TO js-statsXXX NOPE Statistical-js
const sample = [1, 2, 3, 4, 19, 5, 6, 6, 15, 50, 23, 14, 45];

}






//const mountNode = document.getElementById('react-c3js');

return (


  <Card
    style={{
      //top:100,
      //bottom: -120,

      maxWidth : '50%',
      minWidth : '20%',


      float : 'right',
      //zDepth: -10000,
      //border : 10,
      position: 'relative',

      zIndex: -1,
      borderBottomLeftRadius: '20px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '5px',
      padding:"10px",
      boxShadow: '1px 1px 8px  #000',
      border: '1px solid #222',
      backgroundColor: 'rgba(256,256,256,0.8)'
    }}
  >
  <div>
    <CardTitle

      title='Charts'
      titleStyle={{ fontSize : '12pt', lineHeight : '1em' }}
      subtitle='Nodes repartition (how often the band has played the same venue)'
      subtitleStyle={{ fontSize : '8pt', lineHeight : '1em' }}

    />

    <C3Chart
    data={data}
    title={"nodes"}
    unselectAllElements={this.unselectAllElements}
    unselectElement={this.unselectElement}
    selectElement={this.selectElement}
    style={{




    size: { width :10}
    }}
    />
    </div>
    <div>
    <CardTitle

      //title='Charts'
      //titleStyle={{ fontSize : '12pt', lineHeight : '1em' }}
      subtitle='Edges repartition (how often the band has followed the same route)'
      subtitleStyle={{ fontSize : '8pt', lineHeight : '1em' }}
  />
  <C3Chart
  data={data2}
  title={"edges"}
  style={{



  size: { width :10}
  }}
  />
</div>



  /*  <div>

    <Range

            style={{ zIndex : 100 }}
            value={this.props.ui.valueRangeWeight}
            min={this.props.minWeight}
            max={this.props.maxWeight}
            //defaultValue={[ 1281214800000, 1284866786842 ]}
            step={1}
            //marks={marksWeight}
            // tipFormatter={dateFormatter}
            tipProps={{ overlayClassName: 'foo' }}
            //onClick={this.onSliderWChange}
            onChange={this.onSliderWChange}
            //pushable={true}
            allowCross={true}


            />



    </div>*/
    </Card>


)
}

}

export default Charts
