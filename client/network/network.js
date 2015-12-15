Template.networkTemplate.created = function() {
    this.network = new ReactiveVar();
    this.changeLayout = new ReactiveVar();
};

Template.networkTemplate.helpers = {
  hasGeo: function() {
    console.log(hasGeo);
    return hasGeo()
  }
}

Template.networkTemplate.rendered = function() {
    var self = this;
    // console.log( this.data );

    // sidebar
    $('.collapsing').sideNav({
      closeOnClick: true,
      menuWidth: 300, // Default is 240
      edge: 'left' // Choose the horizontal origin
    });
    // $('.button-collapse').sideNav('show');
    // if a node has lat/lng, then addmap layout
    if (hasGeo()) initMap();

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
          $("#map").show();
          var positionMap = function() {
            // console.log("positionMap");


            // get network viewport extent in pixels
            var ext = network.net.extent();
            // console.log(ext);

            // convert ext
            var coordA = convertCoordsToLatLng(ext.x1,ext.y1);
            var coordB = convertCoordsToLatLng(ext.x2,ext.y2);
            // console.log(coordA, coordB);

            // resize map
            resizeMap(coordA, coordB)

          }

          layoutConfig = {
              name: 'preset',
              positions: function(node) {
                  return convertLatLngToCoords(node.data().lat, node.data().lng);
              },
              ready : positionMap,
              stop: savePositions // callback on layoutstop
          }


        } else {
            $("#map").hide();
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

Template.networkTemplate.events = {

};

Template.networkTemplate.onDestroyed(function() {
    // this.network.net.destroy();

    // console.log( 'network destroyed', this.network );
});
