import React, {Component} from 'react';
import cytoscape from 'cytoscape';
import spread from 'cytoscape-spread';

// register layout
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

    // cy.json({elements: this.props.elements});

  }

  shouldComponentUpdate(){
    return false;
  }

  componentWillReceiveProps(nextProps){
    // update
    this.cy.json(nextProps);

    const {layoutName} = nextProps

    // apply new layout if any
    if( this.props.layoutName !== layoutName) {

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
