import './infoBox.css'
import './infoBox.readOnly.html'

import { Session } from 'meteor/session';
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { $ } from 'meteor/jquery'

import { Comments, Nodes, Edges } from '../../../../api/collections.js'

import './nodeInfo/nodeInfo.js'
import './edgeInfo/edgeInfo.js'
import './nodeNeighborhood/nodeNeighborhood.js'

Template.infoBoxReadOnly.helpers({
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
  commentsCount: function() {
    let element = getCurrentSelection()
    let type = Session.get( 'currentType' )
    let topogramId = FlowRouter.getParam('topogramId')

    return Comments.find( {
        'topogramId' : topogramId,
        'elementId': element._id,
        'type': type
    } ).count()

  },
  hasNeighbors: function() {
    let network = Template.instance().data.network.get()
    let node = getCurrentSelection()
    if(node.data) {
      let neighbors = network.nodes().filter("[id='"+node.data.id+"']").neighborhood().length
      return neighbors
    }
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

Template.infoBoxReadOnly.events = {
    'click #closeInfoBox': function(event) {
        event.preventDefault()
        var network = Template.instance().data.network.get()
        network.deselectAll()
    },
    'click #toggle-node-neighborhood': function(event) {
        event.preventDefault()
        $('#node-neighborhood').toggle()
    },
    'click #toggle-commentBox': function(event) {
        event.preventDefault()
        $("#commentBox").toggle()
    },
    'click #toggle-targetSearch': function(event) {
        event.preventDefault()
        $("#targetSearch").toggle()
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
