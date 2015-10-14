Template.single.helpers( {
    categories: function() {
        var network = Networks.findOne();
        return [ "totalGigs", "totalKm", "meanOfGigsPerYear", "meanDelayBetweenGigs", "tourDutyCycle", "co2Spent" ].map( function( cat ) {
            return {
                name: cat,
                value: Math.round( network[ cat ] * 1000 ) / 1000
            };
        } );
    },
    network: function() {
        var network = Networks.findOne();
        // console.log(network);
        return network;
    }
} );

Template.single.helpers( {
    getJSON: function( ) {
        // console.log( cy.json() );
        // return moment( date ).format( "ddd. MMM Do YYYY, hh:mm A" );
    }
} );
