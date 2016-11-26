import { Edges } from '../collections.js'
import { Meteor } from 'meteor/meteor'

import { makeEdge } from '../modelsHelpers.js'

Meteor.methods( {
    addEdge: function( edge ) {
        return Edges.insert( edge )
    },

    addEdgeFromIds: function( topogramId, srcId, targetId ) {
        var e = {
          source: srcId,
          target : targetId
        }
        var edge = makeEdge( topogramId, e, {}, Meteor.userId())
        console.log(edge)
        return Edges.insert( edge )
    },

    updateEdgeInfo: function( edgeId, notes ) {
        console.log(edgeId, notes);
        Edges.update( {
          '_id': edgeId
        }, {
          '$set' : {
              'data.additionalInfo' : notes
            }
        })
    },

    batchInsertEdges: function( edges ) {
        // console.log(edges.length)
        return Edges.batchInsert( edges )
    },

    deleteEdge: function( edgeId ) {
        var edge = Edges.findOne( {
            "data.id": edgeId
        } )
        Edges.remove( edge )
    },

    deleteEdges: function( edgesId ) {
      console.log(edgesId.length);
      Edges.remove({
          "_id": { $in : edgesId }
      })
    },

    deleteEdgesByTopogramId: function( topogramId ) {
        return Edges.remove( {
            "topogramId": topogramId
        } )
    }
} )
