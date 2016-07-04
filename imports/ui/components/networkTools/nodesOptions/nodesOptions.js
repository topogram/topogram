import './nodesOptions.html'

import { Template } from 'meteor/templating'

import { $ } from 'meteor/jquery'
import d3 from 'd3'

import { Nodes } from '../../../../api/collections.js'
import {
  updateRadiusByDegree,
  updateRadiusByWeight
} from '../../network/networkMethods.js'

Template.nodesOptions.helpers({
  nodeColor: function() {
    var node = Nodes.findOne()
    if (node) return (node.data.color) ? true : false
    else return node
  },
  nodeSize: function() {
    var node = Nodes.findOne()
    if (node) return (node.data.weight) ? true : false
    else return node
  }
})

Template.nodesOptions.events = {

  'change #nodeSize': function(event, instance) {
      var net = instance.data.network.get()
      if (event.target.checked) updateRadiusByWeight( net )
      else updateRadiusByDegree( net )
  }
  /*,
  'change #nodeColor': function(event, instance) {
      var net = this.data.network.get()
      if (event.target.checked) console.log("color");
      else net.nodes().forEach(function(ele) {
              ele.style({
                    'background-color': ele.data('starred') ? 'yellow' : "#" + ele.data().color
                })
          })
      }
  }
  */
}
