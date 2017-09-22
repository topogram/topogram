import React, {Component} from 'react';
import cytoscape from 'cytoscape';

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
    console.log(nextProps);
    this.cy.json(nextProps);
    this.cy.fit()
  }

  componentWillUnmount(){
    this.cy.destroy();
  }

  getCy(){
    return this.cy;
  }

  render(){
    return <div style={cyStyle} ref="cyelement" />
  }
}

export default Cytoscape;
