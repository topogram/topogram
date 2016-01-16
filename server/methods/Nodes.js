Meteor.methods( {
    addNode: function( node ) {
        Nodes.insert( node );
    },

    batchInsertNodes: function( nodes ) {
        Nodes.batchInsert( nodes );
    },

    mergeNodes: function( sourceId, targetId ) {
        var source = Nodes.findOne( {
            "_id": sourceId
        } );
        var target = Nodes.findOne( {
            "_id": targetId
        } ); // will be deleted
        // console.log( source.data.id, target.data.id );

        tx.start( "merges nodes" );

        // find and replace all target node edges with source id
        Edges.find( {
            'data.source': target.data.id
        } ).forEach( function( edge ) {
            // console.log( edge.data.source, source.data.id );
            Edges.update( {
                "_id": edge._id
            }, {
                $set: {
                    'data.source': source.data.id
                }
            }, {
                tx: true
            } )
        } )

        Edges.find( {
            'data.target': target.data.id
        } ).forEach( function( edge ) {
            Edges.update( {
                "_id": edge._id
            }, {
                $set: {
                    'data.target': source.data.id
                }
            }, {
                tx: true
            } )
        } );

        // copy data of target into source (if missing)
        // TODO : node merger startegy

        //erase target
        Nodes.remove( {
            '_id': targetId
        }, {
            tx: true
        } );
        tx.commit();
    },

    deleteNode: function( nodeId ) {
        var _id = Nodes.findOne( {
            'data.id': nodeId
        }, {
            "_id": 1
        } )._id;
        Nodes.remove( {
            '_id': _id
        }, {
            tx: true
        } );
    },

    deleteNodeAndConnectedEdges: function( nodeId, edgesId ) {
        var _id = Nodes.findOne( {
            'data.id': nodeId
        }, {
            "_id": 1
        } )._id;

        console.log( nodeId, edgesId, _id );
        tx.start( "delete node+neighborhood" );
        Nodes.remove( {
            "_id": _id
        }, {
            tx: true
        } );
        Edges.find( {
            'data.id': {
                '$in': edgesId
            }
        } ).forEach( function( edge ) {
            Edges.remove( {
                "_id": edge._id
            }, {
                tx: true
            } );
        } );
        tx.commit();
    },

    deleteNodesByTopogramId: function( topogramId ) {
        return Nodes.remove( {
            'topogramId': topogramId
        } );
    },

    //update coords in DB
    updateNodePosition: function( nodeId, position ) {
        var node = Nodes.findOne( {
            'data.id': nodeId
        } );
        Nodes.update( {
            _id: node._id
        }, {
            $set: {
                position: position
            }
        } );
    },

    // TODO : improve batch update of nodes
    // update coords in DB for bunch of nodes (useful to save topogram layout changes)
    updateNodesPositions: function( nodes ) {
        for ( var i = 0; i < nodes.length; i++ ) {
            var node = nodes[ i ];
            Meteor.call( 'updateNodePosition', node.id, node.position )
        }
    },

    lockNode: function( nodeId, position ) {
        var node = Nodes.findOne( {
            'data.id': nodeId
        } );
        var locked = node.locked ? false : true;
        Nodes.update( {
            _id: node._id
        }, {
            $set: {
                'locked': locked,
                'position': position
            }
        } );
    },

    starNode: function( nodeId ) {
        var node = Nodes.findOne( {
            'data.id': nodeId
        } );
        var starred = node.data.starred ? false : true;
        // console.log( 'starred', starred );
        Nodes.update( {
            _id: node._id
        }, {
            $set: {
                'data.starred': starred
            }
        } );
    },

    fetchNodes: function( edges ) {
        var nodeslist = edges.map( function( e ) {
                return {
                    source: e.data.source,
                    target: e.data.target
                };
            } )
            .reduce( function( map, d, i, context ) {
                map[ d.id ] = map[ d.id ] ||  d;
                map[ d.id ].count = ( map[ d.id ].count || 0 ) + 1;
                return map
            }, {} );
    }
} );
