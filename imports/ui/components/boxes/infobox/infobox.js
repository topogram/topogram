import './infobox.html'
import { Template } from 'meteor/templating'

import './nodeInfo/nodeInfo.js'
import './pieChart/pieChart.js'
import '../../boxes/commentBox/commentBox.js'
import '../../boxes/nodeMerge/nodeMerge.js'

import { Session } from 'meteor/session';
import { Nodes, Edges } from '../../../api/collections.js'

Template.infobox.rendered = function() {
  $("#infoBox").hide()
}

Template.infobox.helpers({
  network : function(){
    return Template.instance().data.network
  },
  currentSelection: function() {
      var item = getCurrentSelection()
      return item.data
  },
  target : function() {
    var network = Template.instance().data.network.get()
    if( Session.get( 'currentId' ) && Session.get( 'currentType' ) && Session.get('pathTargetNodeId') ){
      var targetNode = network.nodes().filter("[id='"+Session.get('pathTargetNodeId')+"']")
      return targetNode.data()
    }
  },
  pathToTarget: function() {
    var network = Template.instance().data.network.get()
    if( Session.get( 'currentId' ) && Session.get( 'currentType' ) && Session.get('pathTargetNodeId') ){
      var sourceNode = network.nodes().filter("[id='"+Session.get('currentId')+"']")
      var targetNode = network.nodes().filter("[id='"+Session.get('pathTargetNodeId')+"']")
      var path = network.elements().dijkstra(sourceNode).pathTo(targetNode)
      return path.nodes().map(function(d){ return d.data() })
    }
  }
})

Template.infobox.events = {
    'click #closeInfoBox': function( event, template ) {
        var network = Template.instance().data.network.get()
        network.deselectAll()
    }
}

// get current node
var getCurrentSelection = function() {
  var id = Session.get( 'currentId' ),
      type = Session.get( 'currentType' ),
      item = {}
  if(id && type) {
    if ( type == 'node' ) {
        item = Nodes.findOne( {
            'data.id': id
        } )
    } else if ( type == 'edge' ) {
        item = Edges.findOne( {
            'data.id': id
        } )
    }
  }
  return item
}
