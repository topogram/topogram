Meteor.methods({

    addEdge : function (edge) {
        Edges.insert(edge);
    },

    addEdgeFromIds : function(networkId, srcId, targetId) {
        var edge = makeEdge(networkId, srcId, targetId, {})
        // console.log(edge);
        return Edges.insert(edge);
    },
    batchInsertEdges: function (edges) {
        // console.log(edges.length);
        Edges.batchInsert(edges);
    }, 

    deleteEdge : function(edgeId) {
        var edge = Edges.findOne({ "data.id" : edgeId });
        Edges.remove(edge);
    },

    deleteEdgesByNetworkId :function(networkId) {
        return Edges.remove({"networkId" : networkId });
    },

});
