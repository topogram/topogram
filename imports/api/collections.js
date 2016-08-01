import { Mongo } from 'meteor/mongo'

import { Topograms } from './topograms/Topograms.js'
import { Nodes } from './nodes/Nodes.js'
import { Edges } from './edges/Edges.js'


export const Comments = new Mongo.Collection( 'comments' )

export {
  Nodes,
  Edges,
  Topograms
}

// Users : handle by Meteor.users

// Transactions  config
// tx.collectionIndex = {
//     'nodes': Nodes,
//     'edges': Edges
// }
