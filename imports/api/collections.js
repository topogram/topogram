import { Mongo } from 'meteor/mongo'

import { Topograms } from './topograms/Topograms.js'
import { Nodes } from './nodes/Nodes.js'


export const Comments = new Mongo.Collection( 'comments' )
export const Edges = new Mongo.Collection( 'edges' )

export {
  Nodes,
  Topograms
}

// Users : handle by Meteor.users

// Transactions  config
// tx.collectionIndex = {
//     'nodes': Nodes,
//     'edges': Edges
// }
