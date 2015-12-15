Template.selectLayout.onCreated(function() {
    this.changeLayout = new ReactiveVar();
    // inherit change layout function from parent topogram view
    this.changeLayout.set(this.view.parentView.parentView._templateInstance.changeLayout.get())
});

Template.selectLayout.events = {
  // apply layout
  'click .layout': function(e, template) {
      template.view.parentView.parentView._templateInstance.changeLayout.get()($(e.target).data().layoutName);
  }
}

Template.selectLayout.helpers({

    layouts: function() {
      var layouts =  [
          'springy', 'random', 'grid', 'circle', 'breadthfirst', 'concentric'
      ];

      // add map layout
      if ( hasGeo() ) layouts.push("map");

      return layouts.map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            };
        });
    }

});
