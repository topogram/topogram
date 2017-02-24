import { connect } from 'react-redux';
import { stopSubscription } from 'meteor-redux-middlewares';

import { loadNodes, NODES_SUB } from '/imports/client/actions/nodes';
import { loadEdges, EDGES_SUB } from '/imports/client/actions/edges';

import { TopogramComponent } from '/imports/ui/pages/TopogramComponent';

const mapStateToProps = state => ({
    nodesReady: state.nodes.ready,
    nodes: state.nodes.nodes,
    edgesReady: state.edges.ready,
    edges: state.edges.edges,
  })

const mapDispatchToProps = dispatch => ({
  loadNodes: (topogramId) => dispatch(loadNodes(topogramId)),
  loadEdges: (topogramId) => dispatch(loadEdges(topogramId)),
  stopNodesSubscription: () => dispatch(stopSubscription(NODES_SUB)),
  stopEdgesSubscription: () => dispatch(stopSubscription(EDGES_SUB)),
});

export const TopogramContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopogramComponent);
