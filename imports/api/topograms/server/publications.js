/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor'
import { Topograms } from '../../collections.js'

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
    'sharedPublic': 1
  }, {
    'sort': {
      'createdAt': 1
    },
    'limit': 500
  } )
} )

/*
 *  SINGLE TOPOGRAM
 */
Meteor.publish( 'topogram', function ( topogramId ) {
  return Topograms.find( {
    '_id': topogramId
  } )
} )

Meteor.publish( 'publicTopogram', function ( topogramId ) {
  return Topograms.find( {
    '_id': topogramId,
    'sharedPublic': 1
  } )
} )
