Template.filterByCategory.rendered = function() {
  $("#nodeFilterType select").material_select();
}

Template.filterByCategory.helpers({
    nodeTypes: function() {
        var nodes = Nodes.find({}, {
            fields: {
                'data': 1
            }
        }).fetch();

        var types = [];
        nodes.forEach(function(node) {
            if (types.indexOf(node.data.group) < 0) types.push(node.data.group);
        });

        return types;
    }
})

Template.filterByCategory.events = {
  // filter
  'change #nodeFilterType select': function(e, template) {

      var selectedCategories = $(e.target).find("option:selected").map(function(i, el){ return $(el).val() }).toArray();
      var net = template.view.parentView.parentView.parentView._templateInstance.network.get();

      if (!selectedCategories.length) {
          net.nodes().style({
              'visibility': 'visible'
          })
      } else {
          var visible = net.nodes().forEach(function(ele) {
              if (selectedCategories.indexOf(ele.data("group")) > -1 ) ele.style({
                  'visibility': 'visible'
              })
              else ele.style({
                  'visibility': 'hidden'
              })
          })
      }
  }
}
