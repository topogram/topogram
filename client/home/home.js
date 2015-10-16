Template.home.helpers( {
    hasPublicNetworks: function() {
        return Networks.find().fetch().length > 0;
    },

    publicNetworks: function() {
        return Networks.find().fetch();
    }
} );
