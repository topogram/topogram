import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

import {
  NODES_SUBSCRIPTION_READY,
  NODES_SUBSCRIPTION_CHANGED,
  NODES_SUB,
} from '/imports/client/actions/nodes';

const initialState = {
  ready: false,
  nodes: [],
  nodesSubscriptionStopped: false,
};


export function nodes(state = initialState, action) {
  switch (action.type) {
    case NODES_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.payload.ready,
        nodesSubscriptionStopped: false,
      };
    case NODES_SUBSCRIPTION_CHANGED:
      // convert from Document to plain JS object properly
      let nodes = action.payload.map(d => JSON.parse(JSON.stringify(d)))

      const starts = nodes
        .filter(n => n.data.start)
        .map(n => new Date(n.data.start))
        .sort()

      const ends = nodes
        .filter(n => n.data.end)
        .map(n => new Date(n.data.end))
        .sort((a,b) => b-a)

      const hasTimeInfo = !!(starts.length || ends.length)

      return {
        ...state,
        nodes,
        hasTimeInfo,
        minTime: starts[0],
        maxTime: ends[0]
      };
    case STOP_SUBSCRIPTION:
      return action.payload === NODES_SUB
        ? { ...state, nodesSubscriptionStopped: true }
        : state;
    default:
      return state;
  }
}
