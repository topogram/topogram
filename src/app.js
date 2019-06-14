import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'

import store from "./store";

import "./css/topogram.scss";
import App from './App.jsx'
import { TopogramViewComponent } from "./ui/TopogramViewComponent.jsx"

// load mock data
import nodes from './data/arc5/arc5-nodes.json';
import edges from './data/arc5/arc5-edges.json';
import topogram from './data/arc5/arc5-topogram.json';
// console.log(nodes, edges, topogram);

const mockPromise = (data) => new Promise( (resolve, reject) => {
  resolve(data)
})

const mapStateToProps = state => ({
  nodesReady: state.nodes.ready,
  nodes: state.nodes.nodes,
  hasTimeInfo : state.nodes.hasTimeInfo,
  hasGeoInfo : state.nodes.hasGeoInfo,
  minTime : state.nodes.minTime,
  maxTime : state.nodes.maxTime,
  nodeCategories : state.nodes.nodeCategories,
  edgesReady: state.edges.ready,
  edges: state.edges.edges,
  ui: state.ui,
  config: state.config
})


const mapDispatchToProps = dispatch => ({
  // loadConfig: () => dispatch(mockPromise(topogram)),
  loadNodes: () => dispatch(mockPromise(nodes)),
  loadEdges: () => dispatch(mockPromise(edges))
})

const TopogramViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopogramViewComponent)

ReactDOM.render(
   <Provider store={store}>
     <App>
       <TopogramViewContainer />
     </App>
   </Provider>
  ,
  document.getElementById('app')
);

module.hot.accept();
