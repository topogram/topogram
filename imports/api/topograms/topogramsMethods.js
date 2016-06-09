Meteor.methods( {
    publicTopograms : function() {
      console.log("public.topograms");
      return Topograms.find( { "sharedPublic": 1 }, { 'sort': {  'createdAt': 1 } } );
    },
    topogramListForUser: function( userId ) {
        // console.log(userId);
        return Topograms.find( {
            "owner": userId,
            "name": 1
        }, {
            'sort': {
                'createdAt': 1
            },
            'limit': 500
        } );
    },

    createTopogram: function( ownerId, name ) {
        return Topograms.insert( {
            "name": name,
            "slug": slugify( name ),
            createdAt: new Date(), // current time
            owner: ownerId // _id of logged in user
                // username: Meteor.user().username  // username of logged in user
        } );
    },

    makePublic: function( _id ) {
        return Topograms.update( _id, {
            $set: {
                "sharedPublic": 1
            }
        } );
    },

    makePrivate: function( _id ) {
        return Topograms.update( _id, {
            $set: {
                "sharedPublic": 0
            }
        } );
    },

    deleteTopogram: function( _id ) {
        Meteor.call( "deleteNodesByTopogramId", _id );
        Meteor.call( "deleteEdgesByTopogramId", _id );
        return Topograms.remove( {
            '_id': _id
        } );
    },

    search: function( query, options ) {
        options = options || {};

        // guard against client-side DOS: hard limit to 50
        if ( options.limit ) {
            options.limit = Math.min( 50, Math.abs( options.limit ) );
        } else {
            options.limit = 50;
        }

        // TODO fix regexp to support multiple tokens
        var regex = new RegExp( "^" + query );
        return Topograms.find( {
            "owner": Meteor.userId,
            slug: {
                $regex: regex
            }
        }, options ).fetch();
    }
} );
