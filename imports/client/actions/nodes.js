import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { Nodes } from '/imports/api/collections';

export const NODES_SUBSCRIPTION_READY = 'NODES_SUBSCRIPTION_READY';
export const NODES_SUBSCRIPTION_CHANGED = 'NODES_SUBSCRIPTION_CHANGED';
export const NODES_SUB = 'nodes';

export const loadNodes = (topogramId) => {

  console.log("subscribed to nodes :", topogramId);

  return startSubscription({
    key: NODES_SUB,
    subscribe: () => Meteor.subscribe(NODES_SUB, topogramId),
    get: () => Nodes.find().fetch(),
  });
}
