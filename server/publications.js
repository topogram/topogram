/*
 *  COMMENTS
 */

Meteor.publish( 'comments', function() {
    return Comments.find();
} );


/*
 *  MULTIPLE TOPOGAMS
 */
// only the topogams that have been publicized
Meteor.publish( 'topograms', function( userId ) {
    return Topograms.find( {
        "owner": this.userId
    } );
} );

Meteor.publish( 'publicTopograms', function() {
    return Topograms.find( {
        "sharedPublic": 1
    }, {
        'sort': {
            'createdAt': 1
        },
        'limit': 500
    } );
} );

/*
 *  SINGLE TOPOGRAM
 */
Meteor.publish( 'topogram', function( topogramId ) {
    return Topograms.find( {
        '_id': topogramId
    } );
} );

Meteor.publish( 'publicTopogram', function( topogramId ) {
    return Topograms.find( {
        '_id': topogramId,
        'sharedPublic': 1
    } );
} );

/*
 *  NODES AND EDGES
 */

Meteor.publish( 'edges', function( topogramId ) {
    var edges = Edges.find( {
        'topogramId': topogramId
    } );
    console.log( edges.count(), "edges" );
    return edges;
} );


Meteor.publish( 'nodesLab', function( topogramId ) {
    return Nodes.find( {
        "topogramId": topogramId
    } );
} );

Meteor.publish( 'nodes', function( topogramId ) {

    var edges = Edges.find( {
        "topogramId": topogramId
    } );

    //  var allNodes = edges.map(function(e) {
    //        return {
    //            src: e.data.source,
    //            target: e.data.target
    //        };
    //     }).reduce(function(map, edge) {
    //         // check if src already in map
    //         map.push(edge.src);
    //         // check if target already in map and if target different from src
    //         map.push(edge.target);
    //         return map;
    // }, []);

    // // console.log(allNodes);
    // var nodes  = _.uniq(allNodes);
    // console.log("unique nodes", nodes.length);

    // var nodes = Nodes.find({ 'data.id' : { "$in": nodes.map(function (d) {
    //     return String(d);
    // }) } });

    var nodes = Nodes.find( {
        "topogramId": topogramId
    } );
    console.log( nodes.count(), "nodes" );
    return nodes;
} );
