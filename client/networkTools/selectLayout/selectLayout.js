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
    layout.run();
  }
}

Template.selectLayout.helpers({

    layouts: function() {
      var layouts =  [];
      // add map layout
      if ( hasGeo() ) layouts.push("map");

      layouts.push('cola', 'springy', 'random', 'grid', 'circle', 'cose-bilkent', 'breadthfirst', 'concentric', 'dagre', 'spread')

      return layouts.map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    }

});
