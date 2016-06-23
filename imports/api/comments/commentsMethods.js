import { Comments } from '../collections.js'
import { Meteor } from 'meteor/meteor'

Meteor.methods( {
    addComment: function( id, type, text, ownerId ) {
        // console.log( id, type, text )
        Comments.insert( {
            "id": id,
            "type": type,
            "body": text,
            createdAt: new Date(), // current time
            owner: ownerId         // _id of logged in user
        } )
    }
} )
