import './nodeNeighborhood.html'
import { Template } from 'meteor/templating'
import { colors } from '../../../../helpers/colors.js'

import '../pieChart/pieChart.js'


Template.nodeNeighborhood.helpers({
  neighborhood: function() {
    var node = Template.instance().data.node
    var network = Template.instance().data.network.get()
    if(node.data) {
      var neighborhood = network.nodes().filter("[id='"+node.data.id+"']").neighborhood()
      return neighborhood.nodes().map(function(d){
        var n = d.data()
        n.color = colors(d.data("group"))
        return n
      })
    }
  },
  neighborhoodTypeCount: function() {

    var node = Template.instance().data.node
    var network = Template.instance().data.network.get()

    if(node) {
      var neighborhood = network.nodes().filter("[id='"+node.data.id+"']").neighborhood()

      var count = neighborhood.nodes()
        .map(function(d){ return d.data("group")})
        .reduce(function(map, type){
          map[type] = (map[type]||0)+1
          return map
        }, Object.create(null))

      return Object.keys(count).map(function(key){
        return { "group" : key, "count": count[key], "color": colors(key) }
      })
    }

  }

})
