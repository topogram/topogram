import { Nodes, Edges } from '../collections.js'
import { Meteor } from 'meteor/meteor'
import { bulkCollectionUpdate } from 'meteor/udondan:bulk-collection-update'

import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import { makeNode } from '/imports/api/modelsHelpers'

import logger from '../../logger.js'

// const NODE_ID_ONLY = new SimpleSchema({
//   nodeId: Nodes.simpleSchema().schema('_id'),
// }).validator({ clean: true, filter: false })

/**
* Create a single node
*
* @instance {ValidatedMethod}
* @param {Object} node the raw node data
* @return {Object} the Node object as inserted in Mongo
*/
export const nodeCreate = new ValidatedMethod({
  name: 'node.create',
  validate: Nodes.simpleSchema()
    .pick([
      'topogramId',
      'data.id',
      'data.name',
      'data.color',
      'data.group',
      'data.notes',
      'data.lat',
      'data.lng',
      'data.start',
      'data.end',
      'data.starred',
      'data.weight',
      'position.x',
      'position.y'
    ])
    .validator(),
  run(node) {
    return Nodes.insert( node )
  }
})


/**
* Create multiple nodes at once
*
* @instance {ValidatedMethod}
* @param {Array} nodes an array of node data
* @return {Object} the Node object as inserted in Mongo
*/

const nodeSchema = Nodes.schema.pick([
  'data.id',
  'data.name',
  'data.color',
  'data.group',
  'data.notes',
  'data.lat',
  'data.lng',
  'data.start',
  'data.end',
  'data.starred',
  'data.weight',
  'position.x',
  'position.y'
])

export const nodeCreateMany = new ValidatedMethod({
  name: 'node.createMany',
  validate: new SimpleSchema({
    'topogramId': { type: String },
    'nodes' : { type : [ nodeSchema ], minCount: 1 }
  }).validator(),
  run({ topogramId, nodes }) {
    // TODO : use validated "batchInsert'
    return nodes.map( n =>
      nodeCreate.call({ ...n, topogramId })
    )

    // return Nodes.batchInsert( ok )
  }
})

/**
* Delete all nodes in a Topogram
*
* @instance {ValidatedMethod}
* @param {String} topogramId the _id of the topogram
* @return {Object} the Node object as removed from Mongo
*/
export const nodeDeleteAll = new ValidatedMethod({
  name: 'node.deleteAll',
  validate: new SimpleSchema({ 'topogramId': { type: String } }).validator(), // TODO :check if ID exists,
  run( topogramId ) {
    return Nodes.remove(topogramId)
  }
})


/**
* Delete a single node
*
* @instance {ValidatedMethod}
* @param {String} nodeId _id of the node to be deleted
* @return {Object} the Node object as inserted in Mongo
*/

export const nodeDelete = new ValidatedMethod({
  name: 'node.delete',
  validate: new SimpleSchema({
    nodeId: { type: String }
  }).validator(), // TODO :check if ID exists,
  run({ nodeId }) {
    return Nodes.remove( nodeId )
  }
})

/**
* Delete multiple nodes
*
* @instance {ValidatedMethod}
* @param {Array} nodesId list of node _ids deleted
* @return {Object} the Node object as inserted in Mongo
*/

export const nodeDeleteMany = new ValidatedMethod({
  name: 'node.deleteMany',
  validate: new SimpleSchema({
    nodeIds: { type: [String], minCount: 1 }
  }).validator(), // TODO :check if ID exists,
  run({ nodeIds }) {
    return Nodes.remove( { '_id' : { $in : nodeIds } } )
  }
})

/**
* Update node properties
*
* @instance {ValidatedMethod}
* @param {String} nodeId _id of the node to be updated
* @param {Object} position the new position { x : 0, y, 0} of the node
* @return {Object} the updated Node object as returned by Mongo
*/


const nodeUpdateSchema = Nodes.schema.pick([
  'data.name',
  'data.color',
  'data.group',
  'data.notes',
  'data.lat',
  'data.lng',
  'data.start',
  'data.end',
  'data.starred',
  'data.weight'
])

export const nodeUpdate = new ValidatedMethod({
  name: 'node.update',
  validate: new SimpleSchema([
    nodeUpdateSchema,
    { 'nodeId': { type: String } }
  ]).validator(), // TODO :check if ID exists,
  run( { nodeId, data }) {
    const $set = {}
    Object.keys(data).map( d=> $set['data.'+d] = data[d])
    return Nodes.update({ 'data.id': nodeId }, { $set })
  }
})

/**
* Update node position
*
* @instance {ValidatedMethod}
* @param {String} nodeId _id of the node to be updated
* @param {Object} data the new position { x : 0, y, 0} of the node
* @return {Object} the updated Node object as returned by Mongo
*/
export const nodeMove = new ValidatedMethod({
  name: 'node.move',
  validate: new SimpleSchema({
    'nodeId': { type: String },
    'position.x': { type: Number },
    'position.y': { type: Number }
  }).validator(), // TODO :check if ID exists,
  run({ nodeId, position }) {
    return Nodes.update({ 'data.id': nodeId }, { $set: { position } })
  }
})

Meteor.methods( {

  mergeNodes( sourceId, targetId ) {
    const source = Nodes.findOne( {
      '_id': sourceId
    } )
    const target = Nodes.findOne( {
      '_id': targetId
    } )  // will be deleted

    // tx.start( "merges nodes" )

    // find and replace all target node edges with source id
    Edges.find({
      'data.source': target.data.id
    }).forEach(function (edge) {
      Edges.update({
        '_id': edge._id
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
    }).forEach( function ( edge ) {
      Edges.update({
        '_id': edge._id
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

  deleteNodeAndConnectedEdges( nodeId, edgesId ) {
    const _id = Nodes.findOne( {
      'data.id': nodeId
    }, {
      '_id': 1
    } )._id

    // tx.start( "delete node+neighborhood" )
    Nodes.remove( {
      _id
    })
    Edges.find( {
      'data.id': {
        '$in': edgesId
      }
    } ).forEach( function ( edge ) {
      Edges.remove( {
        '_id': edge._id
      })
    } )
    // tx.commit()
  },

  deleteNodesByTopogramId( topogramId ) {
    return Nodes.remove( {
      topogramId
    } )
  },

  //update coord in DB for a single node
  updateNodePosition( nodeId, position ) {
    const node = Nodes.findOne( {
      'data.id': nodeId
    } )
    Nodes.update( {
      _id: node._id
    }, {
      $set: {
        position
      }
    } )
  },


  // TODO : improve batch update of nodes
  // update coords in DB for bunch of nodes (useful to save topogram layout changes)
  updateNodesPositions( updatedNodes ) {

    const nodesPosition = {}
    updatedNodes.forEach(function (d) {
      nodesPosition[d._id] = d.position
      return d
    })

    const nodes = Nodes.find({
      '_id' : {
        '$in': updatedNodes.map(function (d) {return d._id})
      }
    }).fetch().map(function (d) { // update data
      d.position = nodesPosition[d._id]
      return d
      //  = updatedNodes
    })

    bulkCollectionUpdate(Nodes, nodes, {
      primaryKey : '_id',
      callback() {
        logger.log('Nodes positions updated.')
      }
    })
  },

  lockNode( nodeId, position ) {
    const node = Nodes.findOne( {
      'data.id': nodeId
    } )
    const locked = node.locked ? false : true
    Nodes.update( {
      _id: node._id
    }, {
      $set: {
        locked,
        position
      }
    } )
  },

  // TODO: pass _id instead of data.id
  starNode( nodeId ) {
    const node = Nodes.findOne( {
      'data.id': nodeId
    })
    const starred = node.data.starred ? false : true
    Nodes.update({
      _id: node._id
    }, {
      $set: {
        'data.starred': starred
      }
    })

  },

  fetchNodes( edges ) {
    return edges.map( function ( e ) {
      return {
        source: e.data.source,
        target: e.data.target
      }
    })
      .reduce( function ( map, d ) {
        map[ d.id ] = map[ d.id ] || d
        map[ d.id ].count = ( map[ d.id ].count || 0 ) + 1
        return map
      }, {} )
  }
} )
