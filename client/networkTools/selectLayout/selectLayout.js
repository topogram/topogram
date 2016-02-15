Template.selectLayout.helpers({

    layouts: function() {
      var layouts =  [];
      // add map layout
      if ( hasGeo() ) layouts.push("map");

      layouts.push(
        // 'dagre', // hierarchical ACL display, not useful for us
        // 'cose-bilkent', // uncaught 'prototype' Error
        // 'cola', // can not get it to work
        'spread', // CPU overhead
        'arbor', // works quite okay
        'springy', // force rendering
        'random',
        // 'grid', // uselss layout
        // 'circle', // useless as well
        'breadthfirst',
        'concentric'
      )

      return layouts.map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    }

});

Template.selectLayout.events = {
  // apply layout
  'click .layout': function(e, template) {
    var layoutName = $(e.target).data().layoutName;
    var network = template.view.parentView.parentView._templateInstance.network.get()

    console.log(layoutName);

    if(layoutName == "cola" || layoutName == "arbor" || layoutName == "spread" || layoutName == "springy" || layoutName == "cose-bilkent" ) {
      // var npmLayoutModule = ("cytoscape-"+layoutName).toCamelCase();
      // var layout = window[npmLayoutModule]; // get lib from global scope
      // console.log(network, layout, npmLayoutModule);
      // layout(network) // register layout
    }


    var layoutConfig = {
        animate: false,
        name: layoutName,
        stop: function() {  // callback on layoutstop
            console.log( 'update position' );
            // console.log(network.nodes().length);
            // var nodesLayout = network.nodes().map(function(node) {
            //     return {
            //         _id : node.data("_id"),
            //         position: node.position()
            //     };
            // });
            // console.log(nodesLayout.length, nodesLayout);
            // Meteor.call('updateNodesPositions', nodesLayout); // save nodes position
        }
    };

    var layout = network.makeLayout(layoutConfig);
    // console.log(network);
    layout.run();
  }
}
