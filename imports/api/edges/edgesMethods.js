import { Edges } from '../collections.js'
import { Meteor } from 'meteor/meteor'

import { makeEdge } from '../modelsHelpers.js'

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
