import { Meteor } from 'meteor/meteor'
import { slugify } from '../../helpers'
import { Topograms } from '../collections.js'

Meteor.methods( {
  topogramListForUser( userId ) {
        // console.log(userId)
    return Topograms.find( {
      'owner': userId,
      'name': 1
    }, {
      'sort': {
        'createdAt': 1
      },
      'limit': 500
    } )
  },

  createTopogram( ownerId, name ) {
        // make sure that a topogram with the same name and same user does not already exists
    console.log(ownerId);
    const t = Topograms.find({ name, 'owner': ownerId }).fetch()
    if (t.length)
      return {
        'status' : 'error',
        'message' : 'A topogram with the same name already exists',
        'data' : t
      }

    return Topograms.insert( {
      name,
      'slug': slugify( name ),
      'createdAt': new Date(), // current time
      'sharedPublic' : false,
      'owner': ownerId // _id of logged in user
                // username: Meteor.user().username  // username of logged in user
    } )
  },

  makePublic( _id ) {
    return Topograms.update( _id, {
      $set: {
        'sharedPublic': true
      }
    } )
  },

  makePrivate( _id ) {
    return Topograms.update( _id, {
      $set: {
        'sharedPublic': false
      }
    } )
  },

  deleteTopogram( _id ) {
    Meteor.call( 'deleteNodesByTopogramId', _id )
    Meteor.call( 'deleteEdgesByTopogramId', _id )
    return Topograms.remove( {
      _id
    } )
  },

  search( query, options ) {
    options = options || {}

        // guard against client-side DOS: hard limit to 50
    if ( options.limit ) {
      options.limit = Math.min( 50, Math.abs( options.limit ) )
    } else {
      options.limit = 50
    }

        // TODO fix regexp to support multiple tokens
    const regex = new RegExp( '^' + query )
    return Topograms.find( {
      'owner': Meteor.userId,
      slug: {
        $regex: regex
      }
    }, options ).fetch()
  }
} )
