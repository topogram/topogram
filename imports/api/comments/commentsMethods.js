import { Meteor } from 'meteor/meteor'
import { Comments } from '../collections.js'

Meteor.methods( {
  addComment( topogramId, type, elementId,  text, ownerId ) {
    Comments.insert( {
      elementId,
      type,
      'body': text,
      topogramId,
      createdAt: new Date(), // current time
      owner: ownerId         // _id of logged in user
    } )
  }
} )
