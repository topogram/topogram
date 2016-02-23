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
    console.log(template);
    var network = template.view.parentView.parentView.parentView.parentView._templateInstance.network.get();

    var layoutConfig = {
        animate: false,
        name: layoutName,
        stop: function() {  // callback on layoutstop
            var nodesLayout = network.nodes().map(function(node) {
                return {
                    _id : node.data("_id"),
                    position: node.position()
                };
            });
            Meteor.call('updateNodesPositions', nodesLayout); // save nodes position
        }
    };

    var layout = network.makeLayout(layoutConfig);
    layout.run();
  }
}
