import { Meteor } from 'meteor/meteor'
import { Comments } from '../collections.js'

Meteor.methods( {
    addComment: function( topogramId, type, elementId,  text, ownerId ) {
        Comments.insert( {
            "elementId": elementId,
            "type": type,
            "body": text,
            "topogramId" : topogramId,
            createdAt: new Date(), // current time
            owner: ownerId         // _id of logged in user
        } )
    }
} )
