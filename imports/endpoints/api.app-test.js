/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai'
import request  from 'request'

import { Topograms, Nodes, Edges } from '/imports/api/collections.js'

if (Meteor.isServer) {

  const topogramId = 'topogramId'

  describe('JSON API Routes', function () {

    describe('GET /api', function () {
      it('should show return an API homepage', (done) => {
        request.get('http://localhost:3000/api', function ( err, res, body ) {
          // console.log("callback url response: ", res);
          assert.equal(res.statusCode, 200)
          assert.include(body, 'API')
          done()
        })
      })
    })

    describe('POST /api/topograms', function () {
      it('should create a topogram', (done) => {
        request({
          url : 'http://localhost:3000/api/topograms',
          method: 'POST',
          json: { name : 'topotest' }
        },
        function ( err, res, body ) {
          console.log(body)
          assert.equal(body.status, 'success')
          assert.equal(body.data.length, 17)
          done()
        })
      })
    })

    describe('POST /api/nodes', function () {
      it('should create nodes', (done) => {
        const nodes = Array(3).fill({})
        request({
          url : 'http://localhost:3000/api/nodes',
          method: 'POST',
          json: { topogramId, nodes }
        },
        function ( err, res, body ) {
          assert.equal(body.status, 'success')
          assert.equal(body.data.length, 3)
          done()
        })
      })
    })

    describe('POST /api/edges', function () {
      it('should create edges', (done) => {
        const edges = Array(3).fill({ data : { source : 'a', target : 'b' } })
        request({
          url : 'http://localhost:3000/api/edges',
          method: 'POST',
          json: { topogramId, edges }
        },
        function ( err, res, body ) {
          console.log(body)
          assert.equal(body.status, 'success')
          assert.equal(body.data.length, 3)
          done()
        })
      })
    })
  })


}
