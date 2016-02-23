Template.filterByCategory.rendered = function() {
  this.$("select").material_select();
}

Template.filterByCategory.helpers({
    categories: function() {
      var coll = (this.type=="nodes") ? Nodes : Edges;
      var els = coll.find({}, {
            fields: {
                'data': 1
            }
        }).fetch();

        var types = [];
        els.forEach(function(el) {
            if (types.indexOf(el.data.group) < 0) types.push(el.data.group);
        });

        return types;
    }
})

Template.filterByCategory.events = {
  // filter
  'change select': function(e, template) {

      var selectedCategories = $(e.target).find("option:selected").map(function(i, el){ return $(el).val() }).toArray();

      var net = template.view.parentView.parentView.parentView.parentView._templateInstance.network.get()

      var els = (template.data.type=="nodes") ? net.nodes() : net.edges();

      if (!selectedCategories.length) {
          els.show(); // show everything
      } else {
          var selectedEls = els.filterFn(function(ele) {
              return  selectedCategories.indexOf(ele.data("group")) > -1
          })
          els.not(selectedEls).hide();
          if(template.data.type=="edges") selectedEls.connectedNodes().show()
      }
  }
}
