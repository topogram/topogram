Template.filters.events({
  'click .clear-filters' : function(e, template) {
    console.log(template);
    var net = template.view.parentView.parentView._templateInstance.network.get();
    console.log(net);
    net.resetFilters();
  }
})
