import './nodeInfo.html'
import { Template } from 'meteor/templating'

import { colors } from '../../../../helpers/colors.js'

Template.nodeInfo.rendered= function(){
  $(".collapsible").collapsible()
}

Template.nodeInfo.helpers({
  neighborhood: function() {
    var node = Template.instance().data.node
    var network = Template.instance().data.network.get()
    if(node) {
      var neighborhood = network.nodes().filter("[id='"+node.id+"']").neighborhood()
      return neighborhood.nodes().map(function(d){ return d.data()})
    }
  },
  neighborhoodTypeCount: function() {

    var node = Template.instance().data.node
    var network = Template.instance().data.network.get()

    if(node) {
      var neighborhood = network.nodes().filter("[id='"+node.id+"']").neighborhood()

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
