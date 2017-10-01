/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Topograms, Nodes, Edges } from '/imports/api/collections.js'

import { createNodes, moveNode, updateNode, deleteNodes } from '/imports/endpoints/nodes.js'
import { createEdges, updateEdge, deleteEdges } from '/imports/endpoints/edges.js'
import { getTopograms, createTopogram } from '/imports/endpoints/topograms.js'

if (Meteor.isServer) {

  let topogramId = "topogramId"

  beforeEach( () => {
    Nodes.remove({});
    Edges.remove({});
    topogramId = Factory.create('topogram')._id
    Topograms.remove({});
  });

  describe('Remote API :', function() {
    describe('nodes', function() {
      describe('createNodes', function(){
        it('should create empty nodes', function(done) {
          let nodes = Array(3).fill({})
          createNodes(topogramId, nodes)
          assert.equal(Nodes.find().count(), 3)
          done()
        })
        it('should create a node with data', function(done) {
          assert(true, false)
          let position = { x: 1, y: 2},
            data = { id : "myid", notes : "hello" }
          createNodes(topogramId, [{ position, data },{ position, data }, { position, data }])
          assert.equal(Nodes.find().count(), 3)
          assert.equal(Nodes.findOne().data.notes, "hello")
          assert.equal(Nodes.findOne().position.x, 1)
          assert.equal(Nodes.findOne().position.y, 2)
          done()
        })
      })

      describe('updateNode', function(){
        it('should update data for a single node', function(done) {

          createNodes(topogramId, [ { data : { id : "myid", lat : 1, lng : 2, notes : "hello"} }])
          assert.equal(Nodes.findOne().data.lat,1)
          assert.equal(Nodes.findOne().data.lng,2)
          assert.equal(Nodes.findOne().data.notes,"hello")

          const data = { lat : 2, lng : 3, notes : "hello world" }
          updateNode("myid", data )
          assert.equal(Nodes.findOne().data.lat,2)
          assert.equal(Nodes.findOne().data.lng,3)
          assert.equal(Nodes.findOne().data.notes,"hello world")
          done()
        })
      })

      describe('moveNode', function(){
        it('should update position for a single node', function(done) {

          createNodes(topogramId, [ { position : { x: 1, y: 2}, data : { id : "myid"} }])
          assert.equal(Nodes.findOne().position.x,1)
          assert.equal(Nodes.findOne().position.y,2)

          const position = { x: 2, y: 3}
          moveNode("myid", position)
          assert.equal(Nodes.findOne().position.x, 2)
          assert.equal(Nodes.findOne().position.y, 3)

          done()
        })
      })
    })

    describe('edges', function() {
      describe('createEdges', function(){
        it('should create edges without data', function(done) {
          let edges = Array(3).fill({ data : { source : "1", target : "2" } })
          createEdges(topogramId, edges)
          assert.equal(Edges.find().count(), 3)
          done()
        })
        it('should create edges with data', function(done) {
          let edges = Array(3).fill({ data : { source : "1", target : "2", notes :"bla bla" } })
          createEdges(topogramId, edges)
          assert.equal(Edges.find().count(), 3)
          assert.equal(Edges.findOne().data.notes, "bla bla")
          done()
        })
      })
      describe('updateEdge', function(){
        it('should update a single edges', function(done) {
          let edge = { data : { id : "myEdge", source : "1", target : "2", notes : "hello" } }
          createEdges(topogramId, [edge])
          assert.equal(Edges.find().count(), 1)
          assert.equal(Edges.findOne().data.notes, "hello")

          updateEdge(edge.data.id, { notes : "bye"})
          assert.equal(Edges.findOne().data.notes, "bye")
          done()
        })
      })

    })

    describe('topograms', function() {
      describe('createTopogram', function() {
        it('should create a Topogram based on its name', function(done){
          createTopogram({name : "My Superb Topogram"})
          assert.equal(Topograms.find().count(), 1)
          assert.equal(Topograms.findOne().name, "My Superb Topogram")
          done()
        })
      })
      describe('getTopograms', function() {
        it('should get the list of existing topograms', function(done){
          createTopogram({name : "My Superb Topogram"})
          createTopogram({name : "My Other Superb Topogram"})
          assert.equal(Topograms.find().count(), 2)
          assert.equal(getTopograms().length, 2)
          done()
        })
      })
    })
  })
}
