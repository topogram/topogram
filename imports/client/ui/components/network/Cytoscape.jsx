import React, { Component, PropTypes } from 'react'
import cytoscape from 'cytoscape'
import panzoom from 'cytoscape-panzoom'
import spread from 'cytoscape-spread'
import './Cytoscape.css'
import { scaleLinear } from 'd3-scale'

// register force layout
spread(cytoscape)
panzoom(cytoscape)

const cyStyle = {
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: '0px',
  left: '0',
  zIndex : -1,
  background : "rgba(77,182,172,0.2)"
}
//PANZOOM DEFAULTS
var defaults = {
  position : "float !important",
  align : "center",
  zoomFactor: 0.02, // zoom factor per zoom tick
  zoomDelay: 70, // how many ms between zoom ticks
  minZoom: 0.1, // min zoom level
  maxZoom: 10, // max zoom level
  fitPadding: 50, // padding when fitting
  panSpeed: 10, // how many ms in between pan ticks
  panDistance: 10, // max pan distance per tick
  panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
  panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
  panInactiveArea: 8, // radius of inactive area in pan drag box
  panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
  zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
  fitSelector: undefined, // selector of elements to fit
  animateOnFit: function(){ // whether to animate on fit
    return false;
  },
  fitAnimationDuration: 1000, // duration of animation on fit

  // icon class names
  sliderHandleIcon: 'fa fa-minus',
  zoomInIcon: 'fa fa-plus',
  zoomOutIcon: 'fa fa-minus',
  resetIcon: 'fa fa-expand'
};



class Cytoscape extends Component {
  cy = null;


  // static propTypes = {
  //   elements : {
  //     nodes : React.PropTypes.array,
  //     edges : React.PropTypes.array
  //   }
  // }
  //

  constructor(props) {
    super(props)
    this.state = { init : false }
  }

  componentDidMount() {

    const { style, elements } = this.props

    const cy = cytoscape({
      container: this.refs.cyelement,
      layout: {
        name: 'preset' // load saved positions
      },
      style,
      elements
    })
    cy.panzoom( defaults );

    this.cy = cy

    // console.log(cy);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.width !== this.props.width) return true
    else if (nextProps.height !== this.props.height) return true
    else return false
  }

  applyLayout(layoutName) {
    const layoutConfig = {
      name : layoutName,
      animate: false
    }

    if (layoutName == 'spread') {
      layoutConfig.minDist= 50  // Minimum distance between nodes
      layoutConfig.padding= 80  // Padding
    }

    this.cy.layout(layoutConfig)
  }

  updateRadiusByWeight() {
    // calculate radius range
    const weights = this.cy.nodes().map( d => d.data('weight') )
    const min = Math.min.apply(Math, weights)
    const max = Math.max.apply(Math, weights)
    // console.log("graph legend : min : ", min," max : ",max," units of weight");
    //onsole.log(max);
    // calculate radius range
    const weightDomain = scaleLinear()
      .domain([ min, max ])
      .range([5,15])

    // apply size
    this.cy.style()
      .selector('node')
      .style({
        'width'(e) {
          return weightDomain(e.data('weight'))
        },
        'height'(e) {
          return weightDomain(e.data('weight'))
        }
      }).update()
  }

  updateRadiusByDegree() {
    // calculate radius range
    const degreeDomain = scaleLinear().domain([
      this.cy.nodes().minDegree(),
      this.cy.nodes().maxDegree()
    ]).range([6,40])
    console.log("graph legend : min : ", this.cy.nodes().minDegree()," max : ",this.cy.nodes().maxDegree()," degrees");
    // apply size
    this.cy.style()
      .selector('node')
      .style({
        'width'(e) {
          return degreeDomain(e.degree())
        },
        'height'(e) {
          return degreeDomain(e.degree())
        }
      }).update()
  }

  updateRadius(nodeRadius) {
    nodeRadius === 'weight' ?
      this.updateRadiusByWeight()
      :
      this.updateRadiusByDegree()
  }

  componentWillReceiveProps(nextProps) {

    const { layoutName, nodeRadius } = nextProps

    // replace elements
    this.cy.json(nextProps)

    // apply new layout if any
    if ( this.props.layoutName !== layoutName) {this.applyLayout(layoutName)}

    // init
    if (!this.state.init && nextProps.init) {
      this.applyLayout(layoutName)
      this.setState({ init :true })
    }

    this.updateRadius(nodeRadius)
  }

  componentWillUnmount() {
    this.cy.destroy()
  }

  getCy() {
    return this.cy
  }

  render() {
    const { height, width } = this.props
    return (<div
      style={Object.assign({}, cyStyle, { width, height })}
      ref="cyelement"
      >
      //<cytoscapePanzoom/>

    </div>)
  }
}

Cytoscape.propTypes = {
  elements : PropTypes.object.isRequired,
  width : PropTypes.string.isRequired,
  height : PropTypes.string.isRequired,
  layoutName : PropTypes.string.isRequired,
  nodeRadius : PropTypes.string.isRequired,
  init : PropTypes.bool.isRequired,
  style : PropTypes.object
}

export default Cytoscape
