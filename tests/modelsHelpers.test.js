import { expect }  from 'chai';

import { makeNode, makeEdge } from '../imports/api/modelsHelpers.js'

var topogramId = "topogramTestId",
    userId = "myUser",
    nodeDataId = "myNode",
    edgeDataId = "myEdge"

describe('Model Helpers', function(){
  describe('makeNode', function(){
    it("should parse a new node", function(){

      var n = makeNode(topogramId, { id :  nodeDataId }, {}, userId)
      expect(n.data.id).to.be.equal(nodeDataId)
      expect(n.topogramId).to.be.equal(topogramId)
      expect(n.data.starred).to.be.equal(false)
    });
  });

  describe('makeEdge', function(){
    it("should parse a new node", function(){
      var e = makeEdge(topogramId, {
        id :  edgeDataId,
        source : 'mySource',
        target : 'myTarget'
      }, {}, userId)

      expect(e.data.id).to.be.equal(edgeDataId)
      expect(e.data.source).to.be.equal('mySource')
      expect(e.data.target).to.be.equal('myTarget')
      expect(e.topogramId).to.be.equal(topogramId)
      expect(e.data.starred).to.be.equal(false)
    })
  })
});
