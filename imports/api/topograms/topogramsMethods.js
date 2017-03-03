import { slugify } from '../../helpers'
import { Topograms, Nodes } from '../collections.js'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Meteor } from 'meteor/meteor'

import { buildSuccessAnswer, buildErrorAnswer} from '/imports/api/responses'


const TOPOGRAM_ID_ONLY = new SimpleSchema({
  topogramId: Topograms.simpleSchema().schema('_id'),
}).validator({ clean: true, filter: false })

/**
* Create a topogram
*
* @instance {ValidatedMethod}
* @param {String} name the name of the new topogram
* @return {Object} the Topogram object as inserted in Mongo
*/
export const topogramCreate = new ValidatedMethod({
  name: 'topogram.create',
  validate: new SimpleSchema({
    name: { type: String }
  }).validator(),
  run({ name }) {

    // forbid with the same name
    const t = Topograms.findOne({ name, userId : this.userId })

    if (t && t._id)
      return buildErrorAnswer({
        'message' : 'A topogram with the same name already exists',
        'data' : t
      })

    const sharedPublic = this.userId ? false : true

    return Topograms.insert( {
      name,
      'slug': slugify( name ),
      'createdAt': new Date(), // current time
      sharedPublic,
      userId : this.userId // _id of logged in user
    })
  }
})

/**
* Delete a topogram. Will also delete all edges and nodes with this topogramId
*
* @param {String} _id the Mongo _id of the new topogram
* @return {Object} the Topogram object as inserted in Mongo
*/
export const topogramDelete = new ValidatedMethod({
  name: 'topogram.delete',
  validate: TOPOGRAM_ID_ONLY,
  run({ topogramId }) {
    Nodes.remove({ topogramId }) // delete all connected nodes
    // Meteor.call( 'deleteNodesByTopogramId', topogramId )
    // Meteor.call( 'deleteEdgesByTopogramId', topogramId )
    return Topograms.remove(topogramId)
  }
})


/**
* Make a topograms public
*
* @param {String} _id the Mongo _id of the new topogram
* @return {Object} the Topogram object as inserted in Mongo
*/
/*
makePublic( _id ) {
  return Topograms.update( _id, {
    $set: {
      'sharedPublic': true
    }
  } )
}
*/

/**
* Make a topograms private
*
* @param {String} _id the Mongo _id of the new topogram
* @return {Object} the Topogram object as updated in Mongo
*/
/*
makePrivate( _id ) {
  return Topograms.update( _id, {
    $set: {
      'sharedPublic': false
    }
  } )
}
*/



/**
* Search topograms by name or beginning of name.
* Useful to build an autocomplete or a search of the indexed documents
*
* @param {String} query the (partial) name of the new topogram
* @param {Object} options options for the Mongo query
* @return {Object} the Topogram object as inserted in Mongo
*/
/*
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
*/
