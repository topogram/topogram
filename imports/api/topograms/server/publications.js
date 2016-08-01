/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor'
import { Nodes, Edges, Topograms } from '../../collections.js'

/*
 *  MULTIPLE TOPOGAMS
 */
// only the topogams that have been publicized
Meteor.publish( 'topograms.private', function () {
  if (!this.userId) {
    return this.ready()
  }
  return Topograms.find( {
    'owner': this.userId
  })
} )

Meteor.publish( 'topograms.public', function () {
  return Topograms.find( {
    'sharedPublic': true
  }, {
    'sort': {
      'createdAt': -1
    },
    'limit': 20
  } )

} )

/*
 *  SINGLE TOPOGRAM
 */
Meteor.publish( 'topogram', function ( topogramId ) {
  console.log(topogramId)
  return [
    Topograms.find({ '_id': topogramId }),
    Edges.find({ topogramId }),
    Nodes.find({ topogramId })
  ]
} )

Meteor.publish( 'publicTopogram', function ( topogramId ) {
  return Topograms.find( {
    '_id': topogramId,
    'sharedPublic': 1
  } )
} )
