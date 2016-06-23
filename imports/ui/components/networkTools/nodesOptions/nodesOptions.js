import './nodesOptions.html'

import { Template } from 'meteor/templating'

import $ from 'meteor/jquery'
import d3 from 'd3'

import { Nodes } from '../../../../api/collections.js'

Template.nodesOptions.helpers({
  nodeColorMethod: function() {
      return ["fix", "setInFile", "group", "alphabet", "count", "compNodEdg", "sigma", "sigmaDegree"]
  },

  nodeSizeMethods: function() {
      var node = Nodes.findOne()
      var nodeSizeMethods = ["fixed", "degree"]
      if (!node) return false
      else if (node.data.count) nodeSizeMethods.push("width")
      return nodeSizeMethods
  }

})

Template.nodesOptions.events = {

  'change #nodeSize': function(e, template) {
      var net = template.view.parentView.parentView._templateInstance.network.get()
      var val = $(e.currentTarget).find('option:selected').val()
      var degrees = net.nodes().nodes().map(function(e){ return e.degree() })
      var radiusScale = d3.scale.linear().domain([d3.min(degrees),d3.max(degrees)]).range([ 5, 40 ])

      if (val == 'degree')
          net.nodes().style({
              'width': function (ele) { return radiusScale(ele.degree()) },
              'height': function (ele) { return radiusScale(ele.degree()) }
          })
      else if (val == 'fixed  ')
          net.nodes().style({
              'width': 5,
              'height': 5
          })
      else if (val == 'weight')
          net.nodes().style(function(ele) {
            return {
              'width': ele.data().count,
              'height': ele.data().count
            }
          })
  },
  'change #nodeColorMethod': function(e, template) {
     //TODO : pass through arguments
      var net = template.view.parentView.parentView._templateInstance.network.get()
      var val = $(e.currentTarget).find('option:selected').val()

      if (val == 'setInFile') {
          net.nodes().forEach(function(ele) {
              ele.style({
                    'background-color': ele.data('starred') ? 'yellow' : "#" + ele.data().color
                })
          })
      }
  }
}
