Meteor.methods( {
    addComment: function( id, type, text ) {
        // console.log( id, type, text );
        Comments.insert( {
            "id": id,
            "type": type,
            "body": text,
            createdAt: new Date() //,            // current time
            // owner: Meteor.userId(),           // _id of logged in user
            // username: Meteor.user().username  
        } );
    }
} );
