import { chai } from 'meteor/practicalmeteor:chai';
chai.expect();

import { makeNode } from './modelsHelpers.js'

var topogramId = "topogramTestId",
    userId = "myUser",
    nodeDataId = "myNode"

if (Meteor.isServer || Meteor.isClient) {
  describe('makeNode', function(){
    it("should create a new node", function(){

      var n = makeNode(topogramId, { id :  nodeDataId }, {}, userId)
      expect(n.data.id).to.be.equal(nodeDataId)
      expect(n.owner).to.be.equal(userId)
      expect(n.topogramId).to.be.equal(topogramId)
      expect(n.data.starred).to.be.equal(false)
    });
  });
}
