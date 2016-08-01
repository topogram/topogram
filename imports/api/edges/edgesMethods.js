import { Edges } from '../collections.js'
import { Meteor } from 'meteor/meteor'

import { makeEdge } from '../modelsHelpers.js'

import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const EDGE_ID_ONLY = new SimpleSchema({
  edgeId: Edges.simpleSchema().schema('_id'),
}).validator({ clean: true, filter: false })


/**
* Delete a single edge
*
* @instance {ValidatedMethod}
* @param {String} edgeId _id of the edge to delete
* @return {Object} the Node object as removed from Mongo
*/
export const edgeDelete = new ValidatedMethod({
  name: 'edge.delete',
  validate: EDGE_ID_ONLY,
  run({ edgeId }) {
    return Edges.remove( edgeId )
  }
})

Meteor.methods( {
  addEdge( edge ) {
    return Edges.insert( edge )
  },

  addEdgeFromIds( topogramId, srcId, targetId ) {
    const e = {
      source: srcId,
      target : targetId
    }
    const edge = makeEdge( topogramId, e, {}, Meteor.userId())
    console.log(edge)
    return Edges.insert( edge )
  },

  batchInsertEdges( edges ) {
        // console.log(edges.length)
    return Edges.batchInsert( edges )
  },

  deleteEdge( edgeId ) {
    const edge = Edges.findOne( {
      'data.id': edgeId
    } )
    Edges.remove( edge )
  },

  deleteEdgesByTopogramId( topogramId ) {
    return Edges.remove( {
      topogramId
    } )
  }
} )
