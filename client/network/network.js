// single network
Template.networkTemplate.created = function() {
    this.network = new ReactiveVar();
    this.changeLayout = new ReactiveVar();
};

Template.networkTemplate.rendered = function() {
    var self = this;
    var networkId = this.data.networkId;
    // console.log( this.data );

    $( '#infoBox' ).css( 'visibility', 'hidden' ); // hide infobox by default

    // create graph// network.destroy();
    var network = NetworkGraph.initNetwork( 'network', networkId );

    // real-time
    // Tracker.autorun(function(){
        // fetch and parse data
        var edges = Edges.find().fetch();
        var nodes = Nodes.find().fetch();

        // console.log(edges, nodes);
        console.log('network : ', networkId, nodes .length, 'nodes', edges .length, 'edges' );
        console.log(edges);
        if ( network ) network.updateNetworkData( nodes, edges );

    // });

    console.log(network.net.nodes());

    Template.instance().network.set( network );

    // layout function
    var changeLayout = function( layoutName ) {

        // callback
        var savePositions = function() {
            console.log( 'update position ' );
            var nodesLayout = network.net.nodes().map( function( node ) {
                return {
                    id: node.id(),
                    position: node.position()
                };
            } );
            Meteor.call( 'updateNodesPositions', nodesLayout );
        }

        var layout = network.net.makeLayout( {
            name: layoutName,
            stop: savePositions // callback on layoutstop
        } );
        layout.run();
    }

    Template.instance().changeLayout.set( changeLayout );
};

Template.networkTemplate.onDestroyed( function() {
    // this.network.net.destroy();

    console.log( 'network destroyed', this.network );
} );
