Template.selectLayout.onCreated(function() {
    this.changeLayout = new ReactiveVar();
    console.log(this);
    // inherit change layout function from parent topogram view
    this.changeLayout.set(this.view.parentView.parentView._templateInstance.changeLayout.get())
});

Template.selectLayout.events = {
  // apply layout
  'click .layout': function(e, template) {
    var layoutName = $(e.target).data().layoutName;
    var net = template.view.parentView.parentView._templateInstance.network.get();
    net.changeLayout(layoutName)
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
