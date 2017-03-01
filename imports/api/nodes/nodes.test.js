/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { _ } from 'lodash';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
chai.expect();

import '../factories.js'

import { Nodes } from '/imports/api/nodes/Nodes.js'
import {
  nodeCreate,
  nodeDelete,
  nodeMove
} from '/imports/api/nodes/nodesMethods.js'
import { makeNode } from '/imports/api//modelsHelpers.js'

// import "./nodesMethods.js"

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

    describe('methods', function(){

      describe('node.create', function(){
        it('creates a simple node', function(done) {
          nodeCreate._execute({}, { topogramId });
          assert.equal(Nodes.find().count(), 1)
          assert.equal(Nodes.findOne().data.additionalInfo, null)
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
  });
}
