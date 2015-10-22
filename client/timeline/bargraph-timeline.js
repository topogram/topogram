Template.bargraphTimeline.created = function() {
    this.timeBarGraph = new ReactiveVar();
};

var parseBarGraphDate = function( gigs, timescale ) {
    // parse data w map reduce
    var datesCount = gigs.map( function( d ) {
            return moment( d.datetime ).startOf( timescale ).valueOf();
        } )
        .reduce( function( map, date ) {
            map[ date ] = ( map[ date ] || 0 ) + 1;
            return map;
        }, {} );

    return data = Object.keys( datesCount ).map( function( date ) {
        return {
            'time': parseInt( date ),
            'count': datesCount[ date ]
        };
    } );
};

Template.bargraphTimeline.rendered = function() {
    Session.setDefault( "timescale", "year" );

    var settings = {
        div: this.find( '#bargraph-timeline' ),
        margin: {
            top: 20,
            right: 20,
            bottom: 80,
            left: 40
        },
        width: 900,
        height: 250,
        gap: 0,
        ease: 'cubic-in-out',
        duration: 500
    };

    var timeBarGraph = TimeBarGraph.init( settings );

    // select timescale
    var timescale = Session.get( "timescale" );

    // parse data
    var topogram = Topograms.findOne();
    var data = parseBarGraphDate( topogram.gigs, timescale );

    // draw graph
    timeBarGraph.draw( data, timescale );
    Template.instance().timeBarGraph.set( timeBarGraph );
};

Template.bargraphTimeline.helpers( {
    isSelected: function( value ) {
        return Session.get( "timescale" ) == value;
    }
} );

Template.bargraphTimeline.helpers( {
    start: function() {
        if ( Template.instance().timeBarGraph.get() )
            Template.instance().timeBarGraph.get().setStart( Session.get( 'slider' )[ 0 ] );
    },
    end: function() {
        if ( Template.instance().timeBarGraph.get() )
            Template.instance().timeBarGraph.get().setEnd( Session.get( 'slider' )[ 1 ] );
    },
} );

Template.bargraphTimeline.events( {
    'change #timeScale': function( e ) {
        //timescale
        Session.set( "timeScale", e.currentTarget.value );
        var timescale = e.currentTarget.value;

        // parse data
        var topogram = Topograms.findOne();
        var data = parseBarGraphDate( topogram.gigs, timescale );

        // draw graph
        Template.instance().timeBarGraph.get().draw( data, timescale );
    }
} );
