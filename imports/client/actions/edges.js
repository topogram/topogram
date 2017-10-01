import { Meteor } from 'meteor/meteor'
import { startSubscription } from 'meteor-redux-middlewares'
import { Edges } from '/imports/api/collections'

export const EDGES_SUBSCRIPTION_READY = 'EDGES_SUBSCRIPTION_READY'
export const EDGES_SUBSCRIPTION_CHANGED = 'EDGES_SUBSCRIPTION_CHANGED'
export const EDGES_SUB = 'edges'

export const loadEdges = (topogramId) => {

  console.log('subscribed to nodes :', topogramId)

  return startSubscription({
    key: EDGES_SUB,
    subscribe: () => Meteor.subscribe(EDGES_SUB, topogramId),
    get: () => Edges.find().fetch(),
  })
}
