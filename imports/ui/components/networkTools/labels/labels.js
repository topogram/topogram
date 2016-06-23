import { Template } from 'meteor/templating'
import $ from 'meteor/jquery'

Template.labels.helpers({
  nodeLabelLocations: function() {
      return ["above", "below", "alternate"]
  }
})

Template.labels.events = {

  'change #nodeLabelLocation': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get()
      var val = $(e.currentTarget).find('option:selected').val()

      if (val == 'above') {
          net.nodes().style({ 'text-valign': 'top'})
      } else if (val == 'below') {
          net.nodes().style({'text-valign': 'bottom'})
      }
      else if (val == 'alternate') {
          var alternate = 1
          net.nodes().forEach(function(ele) {
              if ((alternate % 2) == 0) {
                  ele.style({ 'text-valign': 'top'})
              } else {
                  ele.style({'text-valign': 'bottom'})
              }
              alternate = alternate + 1
          })
      }
  },

  'change #textSizeParam': function(event, instance) {
      var net = instance.view.parentView.parentView._templateInstance.network.get()
      var val = event.textSizeParam.value
      net.nodes().css({ 'font-size': val })
  },

  'click .toggle-node-labels': function(e, template) {
    var network = template.view.parentView.parentView._templateInstance.network.get()
    var graphState = template.view.parentView.parentView._templateInstance.graphState.get()
    graphState.showNodesLabels = graphState.showNodesLabels ? 0 : 1
    network.nodes().css({ "text-opacity" : graphState.showNodesLabels })
    template.view.parentView.parentView._templateInstance.graphState.set(graphState)
  },

  'click .toggle-edge-labels': function(e, template) {
    var network = template.view.parentView.parentView._templateInstance.network.get()
    var graphState = template.view.parentView.parentView._templateInstance.graphState.get()
    graphState.showEdgesLabels = graphState.showEdgesLabels ? 0 : 1
    network.edges().css({ "text-opacity" : graphState.showEdgesLabels })
    template.view.parentView.parentView._templateInstance.graphState.set(graphState)

  }
}
