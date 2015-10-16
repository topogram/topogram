Meteor.methods( {
    getGigsByNetwork: function( artistName ) {
        return Networks.findOne( {
            _id: artistName
        } );
    },

    networkListForUser: function( userId ) {
        // console.log(userId);
        return Networks.find({"owner" : userId, "name" :1}, { 'sort' : {'createdAt' : 1}, 'limit' : 500 });
    },

    createNetwork : function (name) {
        return Networks.insert({
            "name" : name,
            "slug" : slugify(name),
            createdAt: new Date(),            // current time
            owner: Meteor.userId()           // _id of logged in user
            // username: Meteor.user().username  // username of logged in user
        })
    },

    makePublic : function(_id) {
        return Networks.update(_id, { $set:  { "sharedPublic" : 1 } });
    },

    makePrivate : function(_id) {
        return Networks.update(_id, { $set: { "sharedPublic" : 0 } });
    },

    deleteNetwork : function(_id) {
        Meteor.call("deleteNodesByNetworkId", _id);
        Meteor.call("deleteEdgesByNetworkId", _id);
        return Networks.remove({ '_id' : _id });
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
        return Networks.find( {
            "owner" : Meteor.userId,
            slug: {
                $regex: regex
            }
        }, options ).fetch( );
    }
} );
