Template.view.helpers( {
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

    getJSON: function() {
        // console.log( cy.json() );
        // return moment( date ).format( 'ddd. MMM Do YYYY, hh:mm A' );
    }
} );
