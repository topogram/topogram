Template.networkTemplate.created = function() {
    this.network = new ReactiveVar();
    this.changeLayout = new ReactiveVar();
};

Template.networkTemplate.rendered = function() {
    var self = this;
    // console.log( this.data );
    initMap();

    $('#infoBox').css('visibility', 'hidden'); // hide infobox by default

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

    Template.instance().network.set(network);

    // layout function
    var changeLayout = function(layoutName) {

        // callback
        var savePositions = function() {
            // console.log( 'update position ' );
            var nodesLayout = network.net.nodes().map(function(node) {
                return {
                    id: node.id(),
                    position: node.position()
                };
            });
            Meteor.call('updateNodesPositions', nodesLayout);
        }

        console.log("layoutName", layoutName)

        var layoutConfig;
        if (layoutName == 'map') {
            
            layoutConfig = {
                name: 'preset',
                positions: function(node) {
                    console.log(network.net.extent());

                    return convertLatLngToCoords(node.data().lat, node.data().lng);
                },
                stop: savePositions // callback on layoutstop
            }
        } else {

            layoutConfig = {
                name: layoutName,
                stop: savePositions // callback on layoutstop
            }
        }
        
        console.log("layoutConfig", layoutConfig)


        var layout = network.net.makeLayout(layoutConfig);
        layout.run();
    }

    Template.instance().changeLayout.set(changeLayout);
};

Template.networkTemplate.onDestroyed(function() {
    // this.network.net.destroy();

    // console.log( 'network destroyed', this.network );
});
