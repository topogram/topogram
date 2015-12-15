Template.filterByCategory.helpers = {
    nodeTypes: function() {
        var nodes = Nodes.find({}, {
            fields: {
                'data.data': 1
            }
        }).fetch();

        var types = [''];
        nodes.forEach(function(node) {
            if (types.indexOf(node.data.type) < 0) types.push(node.data.type);
        });
        return types;
    }
}

Template.filterByCategory.events = {
  // filter
  'change #nodeFilterType': function(e, template) {
      var val = $(e.currentTarget).find('option:selected').val();
      var net = template.view.parentView._templateInstance.network.get().net;

      if (val == '' || !val) {
          net.nodes().style({
              'visibility': 'visible'
          })
      } else {
          var visible = net.nodes().forEach(function(ele) {
              if (ele.data().data.type == val) ele.style({
                  'visibility': 'visible'
              })
              else ele.style({
                  'visibility': 'hidden'
              })
          })
      }
  }
}
