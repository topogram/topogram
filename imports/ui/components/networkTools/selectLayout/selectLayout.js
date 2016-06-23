import './selectLayout.html'
import { Template } from 'meteor/templating'

import { hasGeo } from '../../map/map.js'
import { $ } from 'meteor/jquery'
import { Meteor } from 'meteor/meteor'

Template.selectLayout.helpers({

    layouts: function() {
      var layouts =  []
      // add map layout
      if ( hasGeo() ) layouts.push("map")

      layouts.push(
        // 'dagre', // hierarchical ACL display, not useful for us
        // 'cose-bilkent', // uncaught 'prototype' Error
        // 'cola', // can not get it to work
        'spread', // CPU overhead
        'arbor', // works quite okay
        'springy', // force rendering
        'random',
        // 'grid', // uselss layout
        // 'circle', // useless as well
        'breadthfirst',
        'concentric'
      )

      return layouts.map(function(d) {
            return {
                'slug': d,
                'name': d.charAt(0).toUpperCase() + d.slice(1)
            }
        })
    }

})

Template.selectLayout.events = {
  // apply layout
  'click .layout': function(e, template) {
    var layoutName = $(e.target).data().layoutName
    var network = template.view.parentView.parentView.parentView.parentView._templateInstance.network.get()

    var layoutConfig = {
        animate: false,
        name: layoutName,
        stop: function() {  // callback on layoutstop
            var nodesLayout = network.nodes().map(function(node) {
                return {
                    _id : node.data("_id"),
                    position: node.position()
                }
            })
            Meteor.call('updateNodesPositions', nodesLayout)  // save nodes position
        }
    }

    if(layoutName == "spread"){
      layoutConfig.minDist= 50  // Minimum distance between nodes
      layoutConfig.padding= 80  // Padding
    } else if (layoutName == "springy") {
      // springy forces and config
      layoutConfig.stiffness = 800
      layoutConfig.repulsion = 300
      layoutConfig.damping= 0.9

    }

    var layout = network.makeLayout(layoutConfig)
    layout.run()
  }
}
