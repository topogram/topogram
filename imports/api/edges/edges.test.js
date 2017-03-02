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

import { Edges } from './Edges.js'
import { edgeCreate, edgeDelete } from './edgesMethods.js'
import { nodeCreateMany } from '/imports/api/nodes/nodesMethods.js'


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
          console.log(data);
          let id = edgeCreate._execute({}, {
            topogramId,
            data
          });

          assert.equal(Edges.find().count(), 1);

          let edge = Edges.findOne(id)
          console.log(edge);
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
    })


  })
}
