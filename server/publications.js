/*
*  COMMENTS
*/

Meteor.publish('comments', function() {
    return Comments.find();
});


/*
*  MULTIPLE NETWORKS
*/
// only the networks that have been publicized
Meteor.publish('publicNetworks', function() {
    return  Networks.find({ "sharedPublic" :1 }, { 'sort' : {'createdAt' : 1}, 'limit' : 500 });
});

Meteor.publish('networks', function(userId) {
    return  Networks.find({"owner" : this.userId});
});

/*
*  SINGLE NETWORK
*/
Meteor.publish('network', function (networkId) {
    return Networks.find({'_id' : networkId});
});

Meteor.publish('publicNetwork', function (networkId) {
    return Networks.find({'_id' : networkId, 'sharedPublic' : 1});
});

/*
*  NODES AND EDGES
*/

Meteor.publish('edges', function (networkId) {
    var edges = Edges.find({'networkId' : networkId});
    console.log(edges.count(), "edges");
    return edges;
});


Meteor.publish('nodesLab', function (networkId) {
    return Nodes.find({"networkId" : networkId});
});

Meteor.publish('nodes', function (networkId) {

    var edges = Edges.find({ "networkId" : networkId});

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

    var nodes = Nodes.find({ "networkId" : networkId});
    console.log(nodes.count(), "nodes");
    return nodes;
});


