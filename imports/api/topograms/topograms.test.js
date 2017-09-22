/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor'
import { Factory } from 'meteor/dburles:factory';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

chai.expect();

import '../factories.js'
import { Topograms } from './Topograms.js'
import { Nodes } from '../nodes/Nodes.js'

import { topogramCreate, topogramDelete, topogramUpdateTitle } from './topogramsMethods.js'

if (Meteor.isServer) {
  describe('Topograms', function() {

    import './server/publications.js'

    describe('mutators', function () {
      it('builds correctly from factory', function () {
        const topogram = Factory.create('topogram');
        assert.typeOf(topogram, 'object');
        assert.match(topogram.name, /New Topogram/);
        assert.match(topogram.slug, /New-Topogram/);
      });
    })

    describe('publications', function () {
      const userId = Random.id();

      const createTopogram = (props = {}) => {
        let topogram = Factory.create('topogram', props);
        _.times(3, () => {
          Factory.create('node', { topogramId: topogram._id });
        })
        return topogram
      }

      beforeEach(function () {
        Topograms.remove({}); // clean everythiog
        _.times(3, () => createTopogram()); // 3 without owners
        _.times(1, () => createTopogram({ userId : Random.id(), sharedPublic : true })); // 1 with owners but shared in public
        _.times(2, () => createTopogram({ userId })); // 2 with an owner
        _.times(2, () => createTopogram({ userId: Random.id() })); // 2 with different owners
      });

      //
      // describe('topograms.public', function () {
      //   it('sends all public topograms', function (done) {
      //    const collector = new PublicationCollector();
      //    collector.collect('topograms.public', (collections) => {
      //      console.log(collections);
      //      chai.assert.equal(collections.topograms.length, 4);
      //      done();
      //    });
      //   });
      // });

      describe('topograms.private', function () {
        it('sends only owned topograms', function (done) {
          const collector = new PublicationCollector({ userId });
          collector.collect('topograms.private', (collections) => {
            chai.assert.equal(collections.topograms.length, 2);
            done();
          });
        });
      });

      describe('topogram', function () {
        it('sends only a single topograms', function (done) {
          let topogram = createTopogram();
          const collector = new PublicationCollector();
          collector.collect('topogram', topogram._id, (collections) => {
            chai.assert.equal(collections.topograms.length, 1);
            done();
          });
        });
      });

    })

    describe('methods', function () {

      let topogramId;
      let userId;

      beforeEach(function () {
        Topograms.remove({});
        Nodes.remove({});

        // Create a list and a todo in that list
        topogramId = Factory.create('topogram')._id;
        userId = Random.id(); // Generate a 'user'
      });

      describe('topograms.create', function () {

        it('creates a public topogram with a name by default', function (done) {
          topogramCreate._execute({}, { name :'test name' });
          // assert.isUndefined(Topograms.findOne(topogramId).userId);
          assert.equal(Topograms.find().count(), 2);
          let t = Topograms.findOne({ _id : { $ne : topogramId }})
          assert.equal(t.name, 'test name');
          assert.equal(t.userId, undefined);
          assert.equal(t.sharedPublic, true);
          done()
        })

        it('creates a private topogram with a logged in user ', function (done) {
          topogramCreate._execute({ userId }, { name :'test name' });
          assert.equal(Topograms.find().count(), 2);
          let t = Topograms.findOne({ _id : { $ne : topogramId }})
          assert.equal(t.name, 'test name');
          assert.equal(t.slug, 'test-name');
          assert.equal(t.userId, userId);
          assert.equal(t.sharedPublic, false);
          done()
        })
      })

      describe('topograms.delete', function () {
        it('deletes a topogram based on its _id and its nodes', function(done) {
          Factory.create('node', { topogramId });
          topogramDelete._execute({}, { topogramId });
          assert.equal(Topograms.find().count(), 0);
          assert.equal(Nodes.find().count(), 0);
          done();
        })
      })

      describe('topograms.updateTitle', function () {
        it('update the title of a topogram based on its _id and a new title', function(done) {
          Factory.create('node', { topogramId });
          let title = "blabla"
          let t_before = Topograms.findOne({ _id : topogramId });
          console.log(t_before);

          topogramUpdateTitle._execute({},{
            topogramId,
            title
          });
          assert.equal(Topograms.find().count(), 1);
          let t = Topograms.findOne({ _id : topogramId });
          console.log(t);
          assert.equal(t.name, title);
          done();
        })
      })
    })
  })
}
