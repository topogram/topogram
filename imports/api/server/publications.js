
import { Meteor } from 'meteor/meteor';
import { Comments } from './collections.js';
import { Nodes } from './collections.js';
import { Edges } from './collections.js';
import { Topograms } from './collections.js';


/*
 *  COMMENTS
 */

Meteor.publish( 'comments', function() {
    return Comments.find();
} );


/*
 *  NODES AND EDGES
 */

Meteor.publish( 'edges', function( topogramId ) {
    var edges = Edges.find( {
        'topogramId': topogramId
    } );
    // console.log( edges.count(), "edges" );
    return edges;
} );

Meteor.publish( 'nodes', function( topogramId ) {

    // var edges = Edges.find( {
    //     "topogramId": topogramId
    // } );

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
    // console.log( nodes.count(), "nodes" );
    return nodes;
} );

Meteor.publish( 'nodesLab', function( topogramId ) {
    return Nodes.find( {
        "topogramId": topogramId
    } );
} );
