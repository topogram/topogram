import './nodeMerge.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery'

import { Nodes } from '../../../../api/collections.js'

Template.nodeMerge.onCreated = function() {
    Session.set( "mergeSource", null )
    Session.set( "mergeTargets", null )
}

Template.nodeMerge.events( {
    'click .modal-merge-close': function( ) {
        $( '#modal-merge' ).closeModal()
    },
    'click .select-merge-target': function( event, instance ) {
        var targetId = $(event.target).data('merge-target-id')
        var sourceId = $(event.target).data('merge-source-id')
        var targetGraphId = $(event.target).data('node-to-remove')

        console.log(targetId, sourceId, targetGraphId)

        Meteor.call("mergeNodes", sourceId, targetId)

        $( '#modal-merge' ).closeModal()

        // TODO: pass properly through params
        var net = instance.view.parentView._templateInstance.network.get()

        // remove from graph
        var node = net.filter( 'node[id ="' + targetGraphId + '"]' )

        // node.neighborhood('edge').remove()
        net.remove(node)  // BUG : throw Error
    }
} )

Template.nodeMerge.helpers( {
    targets: function() {
      var targetsId = Session.get( "mergeTargets" )
      var nodes = []
      if (targetsId) nodes = Nodes.find({"data.id" : { "$in" : targetsId }}).fetch()
      return nodes
    },
    source: function() {
      var sourceId = Session.get( "mergeSource" )
      var node = null
      if(sourceId) node = Nodes.findOne({"data.id" : sourceId })
      return node
    }
} )
