import React, {Component} from 'react';
import cytoscape from 'cytoscape';
import spread from 'cytoscape-spread';

import {scaleLinear} from 'd3-scale'

// register force layout
spread(cytoscape)

let cyStyle = {
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: '0px',
  left: '0',
  zIndex : -1
}

class Cytoscape extends Component{
  cy = null;

  componentDidMount(){

    const {nodes, edges, style, elements, layoutName} = this.props

    let cy = cytoscape({
      container: this.refs.cyelement,
      layout: {
          name: 'preset' // load saved positions
      },
      style : style,
      elements: elements
    });

    this.cy = cy;
    // console.log(cy);
  }

  shouldComponentUpdate(layoutName){
    return false;
  }

  applyLayout(layoutName) {
    let layoutConfig = {
      name : layoutName,
      animate: false,
    }

    if(layoutName == "spread"){
      layoutConfig.minDist= 50  // Minimum distance between nodes
      layoutConfig.padding= 80  // Padding
    }

    this.cy.layout(layoutConfig)
  }

  updateRadiusByWeight() {
    // calculate radius range
    let weights = this.cy.nodes().map( d => d.data("weight") )
    let min = Math.min.apply(Math, weights)
    let max = Math.max.apply(Math, weights)

    // calculate radius range
    let weightDomain = scaleLinear()
      .domain([ min, max ])
      .range([6,40])

     // apply size
    this.cy.style()
      .selector('node')
      .style({
        'width': function(e) {
          return weightDomain(e.data("weight"))
        },
        'height': function(e) {
          return weightDomain(e.data("weight"))
        }
      }).update()
  }

  updateRadiusByDegree() {
    // calculate radius range
    let degreeDomain = scaleLinear().domain([
      this.cy.nodes().minDegree(),
      this.cy.nodes().maxDegree()
    ]).range([6,40])

    // apply size
    this.cy.style()
      .selector('node')
      .style({
        'width': function(e) {
          return degreeDomain(e.degree())
        },
        'height': function(e) {
          return degreeDomain(e.degree())
        }
      }).update()
  }

  componentWillReceiveProps(nextProps){
    // update
    this.cy.json(nextProps);

    const {nodeRadius, layoutName} = nextProps

    // apply new layout if any
    if( this.props.layoutName !== layoutName)
      this.applyLayout(layoutName)

    // if( this.props.nodeRadius !== nodeRadius)
    nodeRadius === "weight" ?
      this.updateRadiusByWeight()
      :
      this.updateRadiusByDegree()

    // fit to screen
    this.cy.fit()
  }

  componentWillUnmount(){
    this.cy.destroy();
  }

  getCy(){
    return this.cy;
  }

  render(){
    return <div
      style={cyStyle}
      ref="cyelement"
    />
  }
}

export default Cytoscape;
