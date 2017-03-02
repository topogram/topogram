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

import { nodeCreateMany } from '/imports/api/nodes/nodesMethods.js'

import { Edges } from './Edges.js'
import {
  edgeCreate,
  edgeCreateMany,
  edgeUpdate,
  edgeDelete,
  edgeDeleteMany,
  edgeDeleteAll
} from './edgesMethods.js'


if (Meteor.isServer) {

  describe('Edges', function() {

    describe('mutators', function () {
      it('builds correctly from factory', function () {
        const edge = Factory.create('edge');
        assert.typeOf(edge, 'object');
        assert.typeOf(edge.data.name, 'string');
        assert.typeOf(edge.data.source, 'string');
        assert.typeOf(edge.data.target, 'string');
        assert.equal(edge.group, 'edges');
      });
    })

    let userId = Random.id(),
      edgeDataId = 'my edge',
      topogramId

    beforeEach( () => {
      Edges.remove({});
      topogramId = Factory.create('topogram')._id
    });

    describe('properties', function(){

      describe('data.id : edge ID (user-defined)', function(){

        it('should be randomly generated when unspecified', function(done) {

          let n1id = edgeCreate._execute({}, {topogramId, data : { source : "a", target : "b" }} );
          let n1 = Edges.findOne(n1id)

          let n2id = edgeCreate._execute({}, {topogramId, data : { source : "b", target : "c" }} );
          let n2 = Edges.findOne(n2id)

          assert.notEqual(n1.data.id, n2.data.id)
          assert.notEqual(n1.data.id, null)
          assert.notEqual(n2.data.id, null)
          done()
        })

        it('should be generated once for all', function(done) {

          let data = { source : "10", target : "10" }
          let edgeId = edgeCreate._execute({}, { topogramId, data } );
          let e = Edges.findOne(edgeId)
          let idBefore = e.data.id

          // and never modified
          let dataChange = { source : "12", target : "12" }
          edgeUpdate._execute({}, { edgeId : e.data.id,  data : dataChange } );

          let edgeAfter = Edges.findOne(edgeId)
          assert.equal( edgeAfter.data.id, idBefore)
          assert.equal( edgeAfter.data.source, dataChange.source)
          assert.equal( edgeAfter.data.target, dataChange.target)
          done()

        })

        it('user should be able to define it', function(done) {

          let data = { id : 'myId', source : "a", target : "b" }
          let edgeId = edgeCreate._execute({}, { topogramId, data});
          let n = Edges.findOne(edgeId)
          assert.equal( n.data.id, "myId")
          done()
        })
      })
    })

    describe('methods', function(){

      describe('edge.create', function(){

        it('should require absolutely a Topogram Id', function(done) {
          assert.throws(() => {
            edgeCreate._execute({ /* user id if required*/}, {/*method params*/});
             }, Meteor.Error
          );
          done()
        })

        it('should require absolutely source and target', function(done) {
          assert.throws(() => {
            edgeCreate._execute({ topogramId }, {/*method params*/});
             }, Meteor.Error
          );
          done()
        })

        it('create a simple edge from source and target', function(done) {

          // create fake nodes
          let nodes = Array(2).fill().map((d,i) => Factory.create('node'))

          let data = {
            source : nodes[0].data.id,
            target : nodes[1].data.id,
            id : "my-edge"
          }

          let id = edgeCreate._execute({}, {
            topogramId,
            data
          });

          assert.equal(Edges.find().count(), 1);

          let edge = Edges.findOne(id)
          // assert.notEqual(edge, null)
          // assert.equal(Edges.findOne().data.notes, null)
          done()
        })
      })

      describe('edge.delete', function(){
        it('deletes a edge based on its _id', function(done) {
          let edgeId = Factory.create('edge', { topogramId })._id
          assert.equal(Edges.find().count(), 1)
          edgeDelete._execute({}, { edgeId });
          assert.equal(Edges.find().count(), 0)
          done()
        })
      })

      describe('edge.createMany', function(){
        it('should create a bunch of edges', function(done) {
          let edges = Array(3).fill().map((d,i) => ({
            data : {
              source : String(i),
              target : String(i+1)
            }
          }))

          edgeCreateMany._execute({}, {topogramId, edges} );
          assert.equal(Edges.find().count(), 3)
          done()
        })
      })

      describe("edge.update", function(){
        it('update edge in a node', function(done) {

          let initData = {
            lng : 6.5,
            lat : 12.3,
            id : "my-node",
            source : "my-source",
            target : "my-target",
            notes : 'some text'
          }

          let edgeId = edgeCreate._execute({}, {topogramId, data : initData});

          let edge = Edges.findOne(edgeId)
          assert.equal(edge.data.lat, 12.3)

          edgeUpdate._execute({}, {
            edgeId : edge.data.id,
            data :  {
              lng : 4.5,
              lat : 3.3,
              source : "my-other-source",
              target : "my-other-target",
              notes : 'some other text'
            }});

          let edgeAfter = Edges.findOne(edgeId)

          assert.equal(edgeAfter.data.source, "my-other-source")
          assert.equal(edgeAfter.data.target, "my-other-target")
          assert.equal(edgeAfter.data.notes, 'some other text')
          assert.equal(edgeAfter.data.lat, 3.3)
          assert.equal(edgeAfter.data.lng, 4.5)

          done()
        })
      })

      describe("edge.deleteMany", function(){
        it('delete multiple edges based on their _ids', function(done) {

          let edges = Array(3).fill().map((d,i) => ({
            data : { source : "node-"+i, target : " node-target-"+i }
          }))

          edgeCreateMany._execute({}, {topogramId, edges} );
          assert.equal(Edges.find().count(), 3)

          let edgesAfter = Edges.find({ 'data.id' : { $in : edges.map(d => d.data.id) } }).fetch()
          assert.equal(edgesAfter.length, 3)

          let edgeIds = edgesAfter.map(d => d._id)
          edgeDeleteMany._execute({}, { edgeIds } );
          assert.equal(Edges.find().count(), 0)
          done()
        })
      })

      describe('edge.deleteAll', function(){
        it('should delete a bunch of edges', function(done) {
          let edges = Array(3).fill().map((d,i) => ({
            data : {
              source : String(i),
              target : String(i+1)
            }
          }))

          edgeCreateMany._execute({}, {topogramId, edges} );
          assert.equal(Edges.find().count(), 3)

          edgeDeleteAll._execute({}, {topogramId} );
          assert.equal(Edges.find().count(), 0)
          done()
        })
      })
    })


  })
}
