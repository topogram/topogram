import { Nodes, Edges } from '../collections.js'
import { Meteor } from 'meteor/meteor'
import { bulkCollectionUpdate } from 'meteor/udondan:bulk-collection-update'
import { logger } from "../../logger.js"

Meteor.methods( {
    addNode: function( node ) {
        return Nodes.insert( node )
    },

    batchInsertNodes: function( nodes ) {
        return Nodes.batchInsert( nodes )
    },

    mergeNodes: function( sourceId, targetId ) {
        var source = Nodes.findOne( {
            "_id": sourceId
        } )
        var target = Nodes.findOne( {
            "_id": targetId
        } )  // will be deleted

        // console.log("merging nodes")

        // tx.start( "merges nodes" )

        // find and replace all target node edges with source id
        Edges.find({
            'data.source': target.data.id
        }).forEach(function(edge) {
            Edges.update({
                "_id": edge._id
            },{
                $set: {
                    'data.source': source.data.id
                }
            // },{
            //  tx: true
            })
        })

        Edges.find( {
            'data.target': target.data.id
        }).forEach( function( edge ) {
            Edges.update({
                "_id": edge._id
            },{
              $set: {
                  'data.target': source.data.id
              }

            // }, {
            //     tx: true
            })
        })

        // copy data of target into source (if missing)
        // TODO : node merger startegy

        //erase target
        Nodes.remove({ '_id': targetId })
        // , {
        //     tx: true
        // } )
        // tx.commit()
    },

    deleteNode: function( nodeId ) {
        var _id = Nodes.findOne( {
            'data.id': nodeId
        }, {
            "_id": 1
        } )._id
        Nodes.remove( {
            '_id': _id
        })
    },

    deleteNodeAndConnectedEdges: function( nodeIds ) {
        if (! nodeIds instanceof Array) nodeIds = [nodeIds]
        console.log(nodeIds);

        let ids = Nodes.find({ "_id" : { $in : nodeIds }}, { "data.id" : 1})
          .map(d => d.data.id)
        console.log(ids);

        Nodes.remove( { "_id": { '$in' : nodeIds } })

        Edges.remove( { '$or' : [
          { 'data.source': { '$in' : ids } },
          { 'data.target': { '$in' : ids } }
        ]}, function(err, count){
          console.log(err, count);
        })
    },

    deleteNodesByTopogramId: function( topogramId ) {
        return Nodes.remove( {
            'topogramId': topogramId
        } )
    },

    //update coord in DB for a single node
    updateNodePosition: function( nodeId, position ) {
        var node = Nodes.findOne( {
            'data.id': nodeId
        } )
        Nodes.update( {
            _id: node._id
        }, {
            $set: {
                position: position
            }
        } )
    },


    // TODO : improve batch update of nodes
    // update coords in DB for bunch of nodes (useful to save topogram layout changes)
    updateNodesPositions: function( updatedNodes ) {

      var nodesPosition = {}
      updatedNodes.forEach(function(d){
        nodesPosition[d._id] = d.position
        return d
      })

      var nodes = Nodes.find({
        "_id" : {
          "$in": updatedNodes.map(function(d) {return d._id})
        }
      }).fetch().map(function(d){ // update data
        d.position = nodesPosition[d._id]
        return d
        //  = updatedNodes
      })

      bulkCollectionUpdate(Nodes, nodes, {
        primaryKey : "_id",
        callback: function() {
          logger.log("Nodes positions updated.")
        }
      })
    },

    lockNode: function( nodeId, position ) {
        var node = Nodes.findOne( {
            'data.id': nodeId
        } )
        var locked = node.locked ? false : true
        Nodes.update( {
            _id: node._id
        }, {
            $set: {
                'locked': locked,
                'position': position
            }
        } )
    },

    // TODO: pass _id instead of data.id
    starNode: function( nodeId ) {
        var node = Nodes.findOne( {
            'data.id': nodeId
        })
        var starred = node.data.starred ? false : true
        Nodes.update({
            _id: node._id
        }, {
            $set: {
                'data.starred': starred
            }
        })

    },

    fetchNodes: function( edges ) {
        return edges.map( function( e ) {
                return {
                    source: e.data.source,
                    target: e.data.target
                }
            })
            .reduce( function( map, d ) {
              map[ d.id ] = map[ d.id ] || d
              map[ d.id ].count = ( map[ d.id ].count || 0 ) + 1
              return map
            }, {} )
    }
} )
