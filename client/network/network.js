Template.networkTemplate.created = function() {
    this.network = new ReactiveVar();
    this.changeLayout = new ReactiveVar();
};

Template.networkTemplate.helpers({
  hasGeo: function() {
    console.log(hasGeo());
    return hasGeo()
  }
});

Template.networkTemplate.rendered = function() {
    var self = this;

    // hide infobox by default
    $('#infoBox').css('visibility', 'hidden');

    // create graph// network.destroy();
    var topogramId = this.data.topogramId,
        network = NetworkGraph.initTopogram('network', topogramId);

    // fetch and parse data
    var edges = Edges.find().fetch(),
        nodes = Nodes.find().fetch();
    console.log("nodes", nodes)
    console.log("edges", edges)

    // init data
    if (network) network.initData(nodes, edges);

    var fieldFunctionMap = {
        'data': function(elem, data) {
            elem.data(data);
        },
        'position': function(elem, data) {
            // console.log( elem, data );
            elem.position(data);
        }
    };

    Template.instance().network.set(network);


    // watch changes
    /*
    nodes.observeChanges( {
        added: function( id, fields ) {
            // console.log( 'node added' );
            // network.addNode
        },
        changed: function( _id, fields ) {
            // console.log( 'node changed' );
            var item = network.net.nodes().filter( function( i, node ) {
                return node.data().data._id == _id;
            } );
            // console.log( item );
            for ( var field in fields ) {
                var f = fieldFunctionMap[ field ];
                // console.log( _, f );
                if ( _.isFunction( f ) ) {
                    // console.log( 'test' );
                    f( item, fields[ field ] );
                }
            }
        },
        removed: function() {
            // console.log( 'node removed' );
        }
    } );

    edges.observeChanges( {
        added: function( id, fields ) {
            // console.log( 'edge inserted' );
        },
        changed: function( id, fields ) {
            // console.log( 'edge updated' );
        },
        removed: function() {
            // console.log( 'edge removed' );
        }
    } );
    */
    // console.log('network : ', topogramId, nodes .length, 'nodes', edges .length, 'edges' );
    // console.log(network.net.nodes());
};

Template.networkTemplate.events = {

};

Template.networkTemplate.onDestroyed(function() {
    // this.network.net.destroy();

    // console.log( 'network destroyed', this.network );
});
