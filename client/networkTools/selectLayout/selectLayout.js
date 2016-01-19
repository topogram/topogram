Template.selectLayout.events = {
  // apply layout
  'click .layout': function(e, template) {
    var layoutName = $(e.target).data().layoutName;
    var network = template.view.parentView.parentView._templateInstance.network.get()
    var layoutConfig = {
        name: layoutName,
        stop: function() {  // callback on layoutstop
            console.log( 'update position' );
            // var nodesLayout = self.graph.nodes().map(function(node) {
            //     return {
            //         id: node.id(),
            //         position: node.position()
            //     };
            // });
            // Meteor.call('updateNodesPositions', nodesLayout);
        }
    };

    var layout = network.makeLayout(layoutConfig);
    // console.log(network);
    layout.run();
  }
}

Template.selectLayout.helpers({

    layouts: function() {
      var layouts =  [];
      // add map layout
      if ( hasGeo() ) layouts.push("map");

      layouts.push('random', 'grid', 'circle',
        // 'arbor', 'cola', 'cose-bilkent', 'dagre',
        // 'spread',
        'breadthfirst', 'concentric')

      return layouts.map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    }

});
