/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { _ } from 'lodash';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import '../factories.js'

import { Nodes } from '/imports/api/nodes/Nodes.js'
import {
  nodeCreate,
  nodeMove,
  nodeUpdate,
  nodeCreateMany,
  nodeDelete,
  nodeDeleteMany,
  nodeDeleteAll
} from '/imports/api/nodes/nodesMethods.js'

if (Meteor.isServer) {

  describe('Nodes', function() {

    describe('mutators', function () {
      it('builds correctly from factory', function () {
        const node = Factory.create('node');
        assert.typeOf(node, 'object');
        assert.typeOf(node.data.name, 'string');
        assert.equal(node.group, 'nodes');
      });
    })

    let userId = Random.id(),
      nodeDataId = 'my node',
      topogramId = "topogramId"

    beforeEach( () => {
      Nodes.remove({});
      topogramId = Factory.create('topogram')._id
    });

    describe('properties', function(){

      describe('node id (used by cytoscape)', function(){
        it('should be generated once for all', function(done) {

          let nodeId = nodeCreate._execute({}, {topogramId} );
          let n = Nodes.findOne(nodeId)
          let idBefore = n.data.id

          // and never modified
          let position = { x : 10, y : 10 }
          nodeMove._execute({}, { nodeId : n.data.id,  position } );

          assert.equal( Nodes.findOne(nodeId).data.id, idBefore)
          done()

        })

        it('should be able for user to define it', function(done) {

          let data = { id : 'myId' }
          let nodeId = nodeCreate._execute({}, { topogramId, data});
          let n = Nodes.findOne(nodeId)
          assert.equal( n.data.id, "myId")
          done()

        })

        it('should be generated for each node when unspecified', function(done) {

          let n1id = nodeCreate._execute({}, {topogramId} );
          let n1 = Nodes.findOne(n1id)
          let n2id = nodeCreate._execute({}, {topogramId} );
          let n2 = Nodes.findOne(n2id)

          assert.notEqual(n1.data.id, n2.data.id)
          done()
        })
      })

      describe('createdAt (timestamp)', function(){
        it('should be created once and never modified', function(done) {
          nodeCreate._execute({}, {topogramId} );

          // created once
          let n = Nodes.findOne()
          assert.equal( Math.round(n.createdAt.getTime()/ 10000), Math.round( Date.now()/10000 ) );

          // and never modified
          let position = { x : 10, y : 10 }
          nodeMove._execute({}, { nodeId : n.data.id,  position } );
          let nAfter = Nodes.findOne()
          assert.equal( n.createdAt.getTime(), nAfter.createdAt.getTime())
          done()
        })
      })

      describe('updatedAt (timestamp)', function(){
        it('should be modified on each action', function(done) {
          nodeCreate._execute({}, {topogramId} );

          // created once
          let n = Nodes.findOne()
          assert.equal( Math.round(n.updatedAt.getTime()/ 10000), Math.round( Date.now()/10000 ) );

          // and never modified
          let position = { x : 10, y : 10 }
          nodeMove._execute({}, { nodeId : n.data.id,  position } );
          let nAfter = Nodes.findOne()
          assert.notEqual( n.createdAt.getTime(), nAfter.updatedAt.getTime())
          assert.isAbove( nAfter.updatedAt.getTime(), n.createdAt.getTime())
          done()
        })
      })

    })

    describe('methods', function(){

      describe('node.create', function(){

        it('should require absolutely a Topogram Id', function(done) {
          assert.throws(() => {
             nodeCreate._execute({ /* user id if required*/}, {/*method params*/});
             }, Meteor.Error
          );
          done()
        })

        it('creates a simple node without props', function(done) {
          nodeCreate._execute({}, {topogramId} );
          assert.equal(Nodes.find().count(), 1)
          assert.equal(Nodes.findOne().data.notes, null)
          done()
        })

        // TODO prevent multiple nodes with the same ID
        // it('should be unique', function(done) {
        //
        //   nodeCreate._execute({}, {topogramId}, { data : { id : "myid"}} );
        //
        //   assert.throws(() => {
        //      nodeCreate._execute({}, {topogramId}, { data : { id : "myid"}} );
        //      }, Meteor.Error
        //   );
        //
        //   done()
        // })

        it('creates a node and store data into it', function(done) {

          let data = {
            lng : 6.5,
            lat : 12.3,
            id : "my-node",
            notes : 'some text'
          }

          // console.log(n);
          let nodeId = nodeCreate._execute({}, {topogramId, data});

          let node = Nodes.findOne(nodeId)
          assert.equal(node.data.notes, 'some text')
          assert.equal(node.data.lat, 12.3)
          assert.equal(node.data.lng, 6.5)
          done()
        })
      })

      describe('node.delete', function(){
        it('deletes a node based on its _id', function(done) {
          let nodeId = Factory.create('node', { topogramId })._id
          assert.equal(Nodes.find().count(), 1)
          nodeDelete._execute({}, { nodeId });
          assert.equal(Nodes.find().count(), 0)
          done()
        })
      })

      describe("node.move", function(){
        it("should update 'position' of a node", function(){

          let nodeId = nodeCreate._execute({}, { topogramId });
          let position = { x : 10, y : 10 }
          let nodeBefore = Nodes.findOne(nodeId) // get data id

          nodeMove._execute({}, { nodeId : nodeBefore.data.id,  position } );

          let nodeAfter = Nodes.findOne(nodeId)

          assert.equal(nodeAfter.position.x, 10)
          assert.equal(nodeAfter.position.y, 10)
        })
      })
      describe("node.update", function(){
        it('update data in a node', function(done) {

          let initData = {
            lng : 6.5,
            lat : 12.3,
            id : "my-node",
            notes : 'some text'
          }

          let nodeId = nodeCreate._execute({}, {topogramId, data : initData});

          let node = Nodes.findOne(nodeId)
          assert.equal(node.data.lat, 12.3)



          nodeUpdate._execute({}, {
            nodeId : node.data.id,
            data :  {
              lng : 4.5,
              lat : 3.3,
              notes : 'some other text'
            }});

          let nodeAfter = Nodes.findOne(nodeId)

          assert.equal(nodeAfter.data.notes, 'some other text')
          assert.equal(nodeAfter.data.lat, 3.3)
          assert.equal(nodeAfter.data.lng, 4.5)

          done()
        })
      })

      describe("node.createMany", function(){
        it('stores a group of nodes', function(done) {

          let nodes = Array(3).fill().map((d,i) => ({
            data : {
              lng : i*1.5,
              lat : i*12.3,
              id : "node-"+i,
              notes : 'some text about node '+i
            }
          }))

          nodeCreateMany._execute({}, {topogramId, nodes} );
          assert.equal(Nodes.find().count(), 3)
          done()
        })
      })

      describe("node.deleteMany", function(){
        it('delete multiple nodes based on their _ids', function(done) {

          let nodes = Array(3).fill().map((d,i) => ({
            data : {
              lng : i*1.5,
              lat : i*12.3,
              id : "node-"+i,
              notes : 'some text about node '+i
            }
          }))

          nodeCreateMany._execute({}, {topogramId, nodes} );
          assert.equal(Nodes.find().count(), 3)

          let nodesAfter = Nodes.find({ 'data.id' : { $in : nodes.map(d => d.data.id) } }).fetch()
          assert.equal(nodesAfter.length, 3)

          let nodeIds = nodesAfter.map(d => d._id)
          nodeDeleteMany._execute({}, { nodeIds } );
          assert.equal(Nodes.find().count(), 0)
          done()
        })
      })

      describe("node.deleteAll", function(){
        it('deletes all nodes in a specific topogram', function(done) {

          let nodes = Array(3).fill().map((d,i) => ({
            data : {
              lng : i*1.5,
              lat : i*12.3,
              id : "node-"+i,
              notes : 'some text about node '+i
            }
          }))


          nodeCreateMany._execute({}, {topogramId, nodes} );
          assert.equal(Nodes.find().count(), 3)

          nodeDeleteAll._execute({}, {topogramId} );
          assert.equal(Nodes.find().count(), 0)

          done()
        })
      })

      /*
      describe("starNode", function(){
        it("should toggle 'starred' boolean properly when called", function(){

          Meteor.user = function() { return {} }; // mock user

          var n = makeNode(topogramId, { id :  nodeDataId }, {}, userId)
          Meteor.call("addNode", n)

          var node = Nodes.findOne({"data.id" : nodeDataId})
          expect(node.data.starred).to.be.equal(false)

          Meteor.call("starNode", nodeDataId);
          var nodeStarred = Nodes.findOne({"_id" : node._id})
          expect(nodeStarred.data.starred).to.be.equal(true)
        })
      })
      */
    })
  })
}
