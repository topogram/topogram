import { Edges } from '../collections.js'
import { Meteor } from 'meteor/meteor'

import { makeEdge } from '../modelsHelpers.js'

Meteor.methods( {
    addEdge: function( edge ) {
        Edges.insert( edge )
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

    batchInsertEdges: function( edges ) {
        // console.log(edges.length)
        Edges.batchInsert( edges )
    },

    deleteEdge: function( edgeId ) {
        var edge = Edges.findOne( {
            "data.id": edgeId
        } )
        Edges.remove( edge )
    },

    deleteEdgesByTopogramId: function( topogramId ) {
        return Edges.remove( {
            "topogramId": topogramId
        } )
    }
} )
