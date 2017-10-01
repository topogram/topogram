
import { Meteor } from 'meteor/meteor'
import { Edges, Nodes, Comments } from '../collections.js'

/*
 *  COMMENTS
 */

Meteor.publish( 'comments', function (topogramId) {
  return Comments.find({ topogramId })
})


/*
 *  NODES AND EDGES
 */

Meteor.publish( 'edges', function ( topogramId ) {
  return Edges.find({ topogramId })
})


Meteor.publish( 'nodes', function ( topogramId ) {
  return Nodes.find({ topogramId })
})
