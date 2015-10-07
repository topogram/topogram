Template.map.rendered = function() {
    // session vars
    Session.set( 'minShowsPerVenue', 0 );

    var maxRadius = 25;
    //  parse data
    var network = Networks.findOne();
    var venues = network.gigs
        .map( function( e ) {
            return e.venue;
        } )
        .reduce( function( map, d, i, context ) {
            map[ d.id ] = map[ d.id ] ||  d;
            map[ d.id ].count = ( map[ d.id ].count || 0 ) + 1;
            return map;
        }, {} );

    // GeoJSON features 
    var features = [];

    ///init gravitycenter calculation
    var bandgravitylat = [];
    var bandgravitylong = [];
    Object.keys( venues ).forEach( function( id ) {
        var venue = venues[ id ];

        if ( !isValidCoordinate( venue.latitude, venue.longitude ) ) {
            console.log( venue, id );
            return;
        }

        if ( venue.count > Session.get( "minShowsPerVenue" ) ) {
            // parse GeoJSON  point
            var p = turf.point(
                [ venue.latitude, venue.longitude ], {
                    'name': venue.name,
                    'count': venue.count,
                    'city': venue.city,
                    'country': venue.country
                }
            );
            features.push( p );
            ///add coords for gravitycentercalculation
            for (var c = 0; c < venue.count; c++) {
                bandgravitylat.push( venue.latitude );
                bandgravitylong.push( venue.longitude );
            }
        }
    } );

    // GeoJSON collection
    var collection = turf.featurecollection( features );
    // console.log( "collection", collection );

    var bandgravitycenterlat = 0,
        bandgravitycenterlong = 0;
    for ( var i = 0; i < bandgravitylat.length; i++ ) {
        bandgravitycenterlat += bandgravitylat[ i ];
        bandgravitycenterlong += bandgravitylong[ i ];
    };
    // console.log("bandgravitycenterlat", bandgravitycenterlat);
    bandgravitycenterlat = bandgravitycenterlat / bandgravitylat.length;
    // console.log("bandgravitycenterlat", bandgravitycenterlat);
    bandgravitycenterlong = bandgravitycenterlong / bandgravitylong.length;

    // console.log("centralité géo", bandgravitycenterlat, bandgravitycenterlong);
    var q = [];
    q.push( turf.point(
        [ bandgravitycenterlat, bandgravitycenterlong ], {
            'name': network.name,
            'location': ( bandgravitycenterlat + " " + bandgravitycenterlong ),
            'info': 'centre de gravité'
        }
    ) );

    // console.log("q", q);

    // GeoJSON collection
    var collection = turf.featurecollection( features );
    // console.log("collection", collection);
    var colleccentr = turf.featurecollection( q );
    // console.log("colleccentr", colleccentr);

    // setup map
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    // var url = 'http://tile.stamen.com/toner/{z}/{x}/{y}.png';
    var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var attrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var layer = new L.TileLayer( url, {
        minZoom: 2,
        maxZoom: 16,
        attribution: attrib
    } );
    var map = L.map( 'map' ).setView( [ 51.505, -0.09 ], 6 );
    map.addLayer( layer );

    var svg = d3.select( "#map" ).append( "svg" )
        .style( "position", "absolute" )
        .style( "top", 0 )
        .style( "left", 0 )
        .style( "width", d3.select( "body" ).style( 'width' ) )
        .style( "height", d3.select( "#map" ).style( 'height' ) );

    var g = svg.append( "g" ).attr( "class", "leaflet-zoom-hide" );

    var transform = d3.geo.transform( {
            point: projectPoint
        } ),
        path = d3.geo.path().projection( transform );

    // radius scale 
    var radius = d3.scale.linear()
        .domain( [
            Session.get( 'minShowsPerVenue' ),
            d3.max( Object.keys( venues ).map( function( d ) {
                return venues[ d ].count;
            } ) )
        ] )
        .range( [ 5, maxRadius ] );

    var feature = g.selectAll( "circle" )
        .data( collection.features ).enter()
        .append( "circle" )
        .attr( "r", function( d ) {
            return radius( d.properties.count );
        } )
        .style( "fill", "red" )
        .style( "stroke", "none" )
        .style( "opacity", .6 );

    // features du centre de Gravité géographique FIX ME!! CHANGE STYLE OF THE CENTRALITY POINT
    var g2 = svg.append( "g" ).attr( "class", "leaflet-zoom-hide" );
    var featurecentr = g2.selectAll( "circle" )
        .data( colleccentr.features ).enter()
        .append( "circle" )
        .attr( "r", 10 )
        .style( "fill", "green" )
        .style( "stroke", "none" )
        .style( "opacity", .8 );

    d3.selectAll( "circle" ).on( 'mouseover', function( d ) {
        var infos = "";
        for ( var p in d.properties ) {
            infos += p + ": " + d.properties[ p ] + "\n";
        }
        console.log( infos );
    } );

    // define projection
    map.on( "resize", resetView );
    map.on( "move", update );
    map.on( "zoom", update );
    update();

    function resetView(){
        svg.style( "width", d3.select( "body" ).style( 'width' ) )
        .style( "height", d3.select( "#map" ).style( 'height' ) );
        update();
    }

    function update() {
        var mapBounds = map.getBounds();
        var SW = map.latLngToLayerPoint( mapBounds._southWest ),
            NE = map.latLngToLayerPoint( mapBounds._northEast );
        // console.log(NE, SW);
        // console.log(Math.abs(NE.x - SW.x), Math.abs(NE.y - SW.y));

        svg.attr( "viewBox", SW.x + " " + NE.y + " " + Math.abs( NE.x - SW.x ) + " " + Math.abs( NE.y - SW.y ) );

        // points
        feature.attr( "transform", function( d ) {
            return "translate(" +
                applyLatLngToLayer( d ).x + "," +
                applyLatLngToLayer( d ).y + ")";
        } );

        //point du centre de G géo
        featurecentr.attr( "transform", function( d ) {
            return "translate(" +
                applyLatLngToLayer( d ).x + "," +
                applyLatLngToLayer( d ).y + ")";
        } );
    }

    // Use Leaflet to implement a D3 geometric transformation.

    function projectPoint( x, y ) {
        var point = map.latLngToLayerPoint( new L.LatLng( x, y ) );
        this.stream.point( point.x, point.y );
    }

    function applyLatLngToLayer( d ) {
        var y = d.geometry.coordinates[ 1 ];
        var x = d.geometry.coordinates[ 0 ];
        return map.latLngToLayerPoint( new L.LatLng( x, y ) )
    }

    function isValidCoordinate( lat, lng ) {
        var valLat = parseFloat( lat );
        var valLng = parseFloat( lng );
        return ( !isNaN( valLat ) && valLat <= 90 && valLat >= -90 && !isNaN( valLng ) && valLng <= 180 && valLng >= -180 ) ? true : false;
    }
}

var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split( '' );
    var color = '#';
    for ( var i = 0; i < 6; i++ ) {
        color += letters[ Math.floor( Math.random() * 16 ) ];
    }
    return color;
};

Template.map.events( {
    'click #showVenues': function( e ) {
        e.preventDefault();
        var network = Networks.findOne();
        // render 
    },

    'click showTours': function( e ) {
        e.preventDefault();
        var pointList = result.gigs.map( function( gig, i ) {
            var nextGig = result.gigs[ i + 1 ];
            return new L.LatLng( gig.venue.latitude, gig.venue.longitude );
        } );

        var firstpolyline = new L.Polyline( pointList, {
            color: getRandomColor(),
            weight: 10,
            opacity: 0.5,
            smoothFactor: 1
        } );

        firstpolyline.addTo( template.map );
    }
} );
