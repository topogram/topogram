import { Meteor } from 'meteor/meteor'
import { slugify } from '../../helpers'
import { Topograms } from '../collections.js'

Meteor.methods( {
  /**
  * returns a list of topograms
  * based on the passed user ID
  *
  * @param {String} userId the ID of the user
  * @return {MongoCursor} collection a Mongo Collection
  */
  topogramListForUser( userId ) {
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

  /**
  * create a public topograms (without owner)
  *
  * @param {String} name the name of the new topogram
  * @return {Object} the Topogram object as inserted in Mongo
  */
  createPublicTopogram( name ) {
        // make sure that a topogram with the same name and same user does not already exists
    const t = Topograms.find({ name, 'owner': null }).fetch()
    if (t.length) {
      name += '-' + (new Date()).toDateString() + ' ' +(new Date()).toLocaleTimeString()
    }

    return Topograms.insert( {
      name,
      'slug': slugify( name ),
      'createdAt': new Date(), // current time
      'sharedPublic' : true,
      'owner': null // _id of logged in user
    })

  },

  /**
  * create a topograms with an owner
  *
  * @param {String} name the name of the new topogram
  * @return {Object} the Topogram object as inserted in Mongo
  */
  createTopogram( ownerId, name ) {
        // make sure that a topogram with the same name and same user does not already exists
    console.log(ownerId)
    const t = Topograms.find({ name, 'owner': ownerId }).fetch()
    if (t.length) {
      return {
        'status' : 'error',
        'message' : 'A topogram with the same name already exists',
        'data' : t
      }
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

  /**
  * Make a topograms public
  *
  * @param {String} _id the Mongo _id of the new topogram
  * @return {Object} the Topogram object as inserted in Mongo
  */
  makePublic( _id ) {
    return Topograms.update( _id, {
      $set: {
        'sharedPublic': true
      }
    } )
  },

  /**
  * Make a topograms private
  *
  * @param {String} _id the Mongo _id of the new topogram
  * @return {Object} the Topogram object as updated in Mongo
  */
  makePrivate( _id ) {
    return Topograms.update( _id, {
      $set: {
        'sharedPublic': false
      }
    } )
  },

  /**
  * Delete a topogram. Will also delete all edges and nodes with this topogramId
  *
  * @param {String} _id the Mongo _id of the new topogram
  * @return {Object} the Topogram object as inserted in Mongo
  */
  deleteTopogram( _id ) {
    Meteor.call( 'deleteNodesByTopogramId', _id )
    Meteor.call( 'deleteEdgesByTopogramId', _id )
    return Topograms.remove( {
      _id
    } )
  },

  /**
  * Search topograms by name or beginning of name.
  * Useful to build an autocomplete or a search of the indexed documents
  *
  * @param {String} query the (partial) name of the new topogram
  * @param {Object} options options for the Mongo query
  * @return {Object} the Topogram object as inserted in Mongo
  */
  search( query, options ) {
    options = options || {}

        // guard against client-side DOS: hard limit to 50
    if ( options.limit ) {
      options.limit = Math.min( 50, Math.abs( options.limit ) )
    }
    else {
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
