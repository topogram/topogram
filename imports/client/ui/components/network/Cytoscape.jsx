import React, { Component, PropTypes } from 'react'
import cytoscape from 'cytoscape'
import spread from 'cytoscape-spread'

import { scaleLinear } from 'd3-scale'

// register force layout
spread(cytoscape)

const cyStyle = {
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: '0px',
  left: '0',
  zIndex : -1
}

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

    if (layoutName == 'preset') {
      const {nodes} = this.props.elements
      // get positions from the db
      layoutConfig.positions = (n) => (nodes[n.data('i')].storedPosition)
    }

    this.cy.layout(layoutConfig)
  }

  updateRadiusByWeight() {
    // calculate radius range
    const weights = this.cy.nodes().map( d => d.data('weight') )
    const min = Math.min.apply(Math, weights)
    const max = Math.max.apply(Math, weights)

    // calculate radius range
    const weightDomain = scaleLinear()
      .domain([ min, max ])
      .range([6,40])

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
    />)
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
