import './infoBox.html'
import { Template } from 'meteor/templating'

import './nodeInfo/nodeInfo.js'
import './edgeInfo/edgeInfo.js'
import './pieChart/pieChart.js'
import '../../boxes/commentBox/commentBox.js'
import '../../boxes/nodeMerge/nodeMerge.js'

import { $ } from 'meteor/jquery'

import { Session } from 'meteor/session';
import { Nodes, Edges } from '../../../../api/collections.js'

Template.infoBox.rendered = function() {
  $("#infoBox").hide()
}

Template.infoBox.helpers({
  networkInstance : function(){
    return Template.instance().data.network
  },
  isNode  : function() {
    return Session.get( 'currentType' ) == "node"
  },
  currentSelection: function() {
      var item = getCurrentSelection()
      return item
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

Template.infoBox.events = {
    'click #closeInfoBox': function( ) {
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
        item = Nodes.findOne( id )
    } else if ( type == 'edge' ) {
        item = Edges.findOne( id )
    }
  }
  return item
}
