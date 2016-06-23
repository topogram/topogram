import './searchbox.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session';
import { Nodes } from '../../../../api/collections.js'

import $ from 'meteor/jquery'


Template.searchBox.rendered = function() {
  $(".search").dropdown()
  $("#new-node").hide()
}

Template.searchBox.events( {
    'click .search-dropdown>li': function(event, instance) {
        var divName = instance.data.searchName
        var searchType = instance.data.type

        $("#new-node a").data("node-id", undefined)
        $("#new-node a span").html(undefined)

        // get network
        var net = Template.instance().data.network.get()

        // display text
        $("#"+divName+" .search" ).attr("value", $(event.target).text())

        // check there is a proper data argument
        if ( !$(event.target).data("node-id") ) return

        // select my nodes
        var selectedNode = net.nodes().filter("[id='"+$(event.target).data("node-id")+"']")

        // create new node if it does not exists
        if(!selectedNode.length){
          net.createNode($(event.target).data("node-id"))

        } else {

          // check if a node is already selected
          if(searchType == 'source') {

            // display info
            Session.set('currentType', 'node')
            Session.set('currentId', selectedNode.id())

            // color focus
            net.selectElement(selectedNode, "node")

          } else if(searchType == 'target') {

            // select a second node and draw path
            var nodeOrigin = net.nodes().filter("[id='" + Session.get('currentId') + "']")
            Session.set('pathTargetNodeId', selectedNode.data('id'))
            net.drawPath(nodeOrigin, selectedNode)
          }
        }
    },

    'click .searchClose': function( event ) {
        event.preventDefault()

        // TODO : remove ugly jquery here
        $(".search" ).val("")
        $( "ul.search-dropdown li").not('#new-node').remove()

        $("#new-node a").data("node-id", "")
        $("#new-node a span").html("")

        var net = Template.instance().data.network.get()

        // reset display
        net.unFocus()
    },


    'keyup .search': function( event ) {
        var options = options || {}
        if ( options.limit ) {
            options.limit = Math.min( 10, Math.abs( options.limit ) )
        } else {
            options.limit = 20
        }

        if ( event.target.value != '' ) {
          $( ".search-dropdown>li").not('#new-node').remove()  // clean list
          $("#new-node").show()
          $("#new-node a").data("node-id", event.target.value)
          $("#new-node a span").html(event.target.value)

          var nodes =  Nodes.find({
            'data.name' : {
              $regex: event.target.value+"*",
              $options : "i"
            }}, options ).fetch()

          nodes.forEach( function( r ) {
            $( "ul.search-dropdown" ).append( "<li><a href=# data-node-id=" + r.data.id + ">" + r.data.name + "</a></li>" )
          } )

        } else {
          $("#new-node").hide()
          $( ".search-dropdown>li").not('#new-node').remove()
        }
    }
} )
