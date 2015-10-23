Template.view.helpers( {
    categories: function() {
        var topogram = Topograms.findOne();
        return [ 'totalGigs', 'totalKm', 'meanOfGigsPerYear', 'meanDelayBetweenGigs', 'tourDutyCycle', 'co2Spent' ].map( function( cat ) {
            return {
                name: cat,
                value: Math.round( topogram[ cat ] * 1000 ) / 1000
            };
        } );
    },

    topogram: function() {
        var topogram = Topograms.findOne();
        return topogram;
    },

    hasNodes: function() {
        return Nodes.find().fetch().length > 0;
    },

    hasEdges: function() {
        return Edges.find().fetch().length > 0;
    },

    hasElements: function() {
        return Nodes.find().fetch().length > 0 || Edges.find().fetch().length > 0;
    },

    hasNetwork: function() {
        return Nodes.find().fetch().length > 0 && Edges.find().fetch().length > 0;
    },

    hasGeo: function() {
        var nodes = Nodes.find().fetch();
        return nodes[ 0 ].data.data.lat ? true : false;
    },

    getJSON: function() {
        // console.log( cy.json() );
        // return moment( date ).format( 'ddd. MMM Do YYYY, hh:mm A' );
    }
} );