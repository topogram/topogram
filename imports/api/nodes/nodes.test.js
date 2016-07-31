import { Meteor } from 'meteor/meteor'
import { chai } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
chai.expect();

import { Nodes } from '../collections.js'
import { makeNode } from '../modelsHelpers.js'
import "./nodesMethods.js"

describe('Nodes', function() {

  // TODO : make this real using other models !
  var topogramId = "topogramTestId",
      userId = "myUser",
      nodeDataId = "myNode"

  beforeEach( () => {
    resetDatabase();
  });

  describe('makeNode', function(){
    it("should create a new node", function(){
      var n = makeNode(topogramId, { id :  nodeDataId }, {}, userId)
      expect(n.data.id).to.be.equal(nodeDataId)
      expect(n.owner).to.be.equal(userId)
      expect(n.topogramId).to.be.equal(topogramId)
      expect(n.data.starred).to.be.equal(false)
    });
  });

  describe('addNode', function() {

    it('should call Mongo insert method', function() {

      // create a new node
      var n = makeNode(topogramId, { id :  nodeDataId }, {}, userId)
      Meteor.call("addNode", n)

      var nodes = Nodes.find().fetch()
      expect(nodes.length).to.be.equal(1)

      var node = nodes[0]
      expect(node.data.id).to.be.equal(nodeDataId)
      expect(node.owner).to.be.equal(userId)
      expect(node._id).not.to.be.an('undefined')

    })

  });

  describe("starNode", function(){
    it("should toggle 'starred' boolean properly when called", function(){

      Meteor.user = function() { return {} }; // mock user

      var n = makeNode(topogramId, { id :  nodeDataId }, {}, userId)
      Meteor.call("addNode", n)

      var node = Nodes.findOne({"data.id" : nodeDataId})
      console.log(node);
      expect(node.data.starred).to.be.equal(false)

      Meteor.call("starNode", nodeDataId);
      var nodeStarred = Nodes.findOne({"_id" : node._id})
      expect(nodeStarred.data.starred).to.be.equal(true)
    })
  })
});
