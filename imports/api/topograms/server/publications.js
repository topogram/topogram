/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor'
import { Nodes, Edges, Topograms } from '../../collections.js'

/*
 *  MULTIPLE TOPOGAMS
 */
// only the topogams that have been publicized
Meteor.publish( 'topograms.private', function topogramsPrivate() {
  if (!this.userId) {
    return this.ready()
  }
  return Topograms.find( {
    'userId': this.userId
  })
} )

Meteor.publish( 'topograms.public', function topogramsPrivate() {
  return Topograms.find( {

    $or: [
      { 'userId' : { $exists: false } },
      { 'sharedPublic' : true }
    ]
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

  // TODO : prevent subscribing to private topogram
  return [
    Topograms.find({ '_id': topogramId }),
    Edges.find({ topogramId }),
    Nodes.find({ topogramId })
  ]
})
