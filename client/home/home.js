Template.home.helpers( {
    hasPublicTopograms: function() {
        return Topograms.find( {
            "sharedPublic": 1
        } ).fetch().length > 0;
    },

    publicTopograms: function() {
        return Topograms.find( { "sharedPublic": 1 }, { 'sort': {  'createdAt': 1 } } ).fetch();
    }
} );
