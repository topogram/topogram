Template.edgesOptions.helpers({
  edgeWidthMethod: function() {
      return edgeWidthMethod = ["simple", "width"]
  },
  edgeEndMethod: function() {
      return edgeEndMethod = ["simple", "arrow", "arrows"]
  }
})

Template.edgesOptions.events = {
  'change #edgeWidthMethod': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var val = $(e.currentTarget).find('option:selected').val();
      var nodes = Nodes.find().fetch(),
          edges = Edges.find().fetch();
      var self = this;

      if (val == 'simple') {
          net.edges().forEach(function(ele) {
              ele.style({
                  'width': 5
              })
          })
      } else if (val == 'width') {
          net.edges().forEach(function(ele) {
              ele.style({
                  'width': ele.data().width
              })
          })
      }
  },
  'change #edgeEndMethod': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get().net;
      var val = $(e.currentTarget).find('option:selected').val();
      var nodes = Nodes.find().fetch(),
          edges = Edges.find().fetch();
      var self = this;

      if (val == 'simple') {
          net.edges().forEach(function(ele) {
              ele.style({
                  'target-arrow-shape': 'none',
                  'source-arrow-shape': 'none'
              })
          })
      } else if (val == 'arrow') {
          net.edges().forEach(function(ele) {
              ele.style({
                  'target-arrow-shape': 'triangle',
                  'source-arrow-shape': 'none'
              })
          })
      } else if (val == 'arrows') {
          net.edges().forEach(function(ele) {
              ele.style({
                  'target-arrow-shape': 'triangle',
                  'source-arrow-shape': 'triangle'
              })
          })
      }
  },
}
