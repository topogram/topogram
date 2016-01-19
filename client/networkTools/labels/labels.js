Template.labels.helpers({
  nodeLabelLocations: function() {
      return ["above", "below", "alternate"]
  }
})

Template.labels.events = {

  'change #nodeLabelLocation': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get();
      var val = $(e.currentTarget).find('option:selected').val();

      if (val == 'above') {
          net.nodes().style({ 'text-valign': 'top'})
      } else if (val == 'below') {
          net.nodes().style({'text-valign': 'bottom'})
      }
      else if (val == 'alternate') {
          var alternate = 1;
          net.nodes().forEach(function(ele) {
              erro = alternate % 2
              if ((alternate % 2) == 0) {
                  ele.style({ 'text-valign': 'top'})
              } else {
                  ele.style({'text-valign': 'bottom'})
              }
              alternate = alternate + 1;
          })
      }
  },

  'change #textSizeParam': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get();
      var val = textSizeParam.value;
      net.nodes().style({ 'font-size': val })
  },

  'click .toggle-node-labels': function(e, template) {
    var network = template.view.parentView.parentView._templateInstance.network.get();
    network.graphState.showNodesLabels = network.graphState.showNodesLabels ? 0 : 1;
    network.nodes().css({ "text-opacity" : network.graphState.showNodesLabels })
  },

  'click .toggle-edge-labels': function(e, template) {
    var net = template.view.parentView.parentView._templateInstance.network.get();
    var network = template.view.parentView.parentView._templateInstance.network.get();
    network.graphState.showEdgesLabels = network.graphState.showEdgesLabels ? 0 : 1;
    network.edges().css({ "text-opacity" : network.graphState.showEdgesLabels })
  }
}
