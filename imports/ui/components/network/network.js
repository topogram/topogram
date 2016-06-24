import './network.html'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'

import { makeNode } from '../../../api/modelsHelpers.js'

import { Nodes, Edges } from '../../../api/collections.js'
import { colors } from '../../helpers/colors.js'

import {
  applyDefaultStyle,
  initGraph,
  initActions,
  mouseActions,
  initGraphNodesEdges
} from './networkMethods.js'

import { $ }  from 'meteor/jquery'
import d3 from 'd3'

// truncate String to make it shorter
String.prototype.trunc = String.prototype.trunc ||
  function(n){
      return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
};

Template.network.onCreated( function() {
  var self = this;

  // get reactive graphState
  this.graphState = this.data.graphState

  // constants
  this.editMode = this.data.editMode

  // delete/add nodes
  this.advancedEditMode = Session.get('advancedEditMode')

  // init node/edge selector
  $('#infoBox').hide()  // hide infobox by default
  Session.set( 'currentId', null )
  Session.set( 'currentType', null )
  Session.set('pathTargetNodeId', null)

  // node merger
  Session.set("mergeSource", null)
  Session.set("mergeTargets", null)

  var topogramId = FlowRouter.getParam('topogramId')
  var nodesSubscription = self.subscribe( 'nodes', topogramId )
  var edgesSubscription = self.subscribe( 'edges', topogramId )

  var nodesEdgesReady = false

  self.autorun(function() {

    if (nodesSubscription.ready() && edgesSubscription.ready()) {

      // fetch and parse data
      var nodes = Nodes.find().fetch().map(function(i){
        i.data._id = i._id
        i.parent = "nparent"
        i.data.parent = "nparent"
        return i
      })

      var edges = Edges.find().fetch().map(function(i){
        i.data._id = i._id
        return i
      })

      console.log("nodes", nodes.length)
      console.log("edges", edges.length)
      nodesEdgesReady = true;
      initGraphNodesEdges(self.graph, nodes, edges)

    }


    if (nodesEdgesReady) {
      Nodes.find().observe({
        added: function( node ) {
          node.data._id = node._id  // make _id accessible in the el.data()
          var el = self.graph.filter('node[_id = "'+node._id+'"]')
          if(!el.length) {
            self.graph.add(node) // add a node
          console.log("node added");

            // TODO: apply size
            // calculate radius range
            // var degreeDomain = d3.scale.linear().domain([
            //   self.graph.nodes().minDegree(),
            //   self.graph.nodes().maxDegree()
            // ]).range([6,40])
            //
            // // apply size
            // self.graph.style()
            //   .selector('node')
            //   .style({
            //     'width': function(e) {
            //       return degreeDomain(e.degree())
            //     },
            //     'height': function(e) {
            //       return degreeDomain(e.degree())
            //     }
            //   }).update()
          }
        },
        removed: function( node ) {
          var el = self.graph.filter('node[_id = "'+node._id+'"]')
          self.graph.remove(el)
        }
      })

      // watch changes diff
      Nodes.find().observeChanges( {
        changed: function( _id, fields ) {
            var item = self.graph.nodes().filter( function( i, node ) {
                return node.data("_id") == _id
            })
            for ( var field in fields ) {
              if (field == "position") item.position(fields[field])
              // TODO : update all node properties
            }
        }
      })

      Edges.find().observe( {
          added: function( edge ) {
            edge.data._id = edge._id  // make _id accessible in the el.data()
            var el = self.graph.filter('edge[_id = "'+edge._id+'"]')

            var nodeIds = self.graph.nodes().map( function(n)  { return n.id() })
            if(nodeIds.indexOf(edge.data.source) > -1 && nodeIds.indexOf(edge.data.target) > -1 && !el.length)
              self.graph.add(edge)
          }
          // ,
          // removed: function() {
          //     // console.log( 'edge removed' )
          // }
      })
    }
  })


})

Template.network.onRendered(function() {
    var self = this

    self.topogramId = self.data.topogramId
    var domElement = self.find("#network")
    console.log(domElement);
    if(!self.graph) self.graph = initGraph(domElement)

    console.log(self)





    // clean eveything
    // this.graph.elements().remove()


    // add data and watch changes
    this.autorun(function(){

    })

    console.log(self.graph)


    // Styling
    // applyDefaultStyle(self.graph)
    self.graph.reset()  // render layout

    // mouse select actions
    this.graph.on('tap', 'node', function(e) {
        var node = e.cyTarget
        self.graph.selectElement(node, "node")
    })

    // display edge info
    this.graph.on('tap', 'edge',function(e) {
      e.cyTarget.css({
        'text-opacity' : function(d){
          return  (d.style('text-opacity') == "1") ? "0" : "1"
        },
        'line-color' : function(d) {
          return d.style('line-color') == "green" ? "#AAAAAA" : "green"
        }
      })
    })



    this.graph.createNode = function(id){
      // get x, y
      var x = $("#network").width()/2,
          y = $("#network").height()/2

      var n = makeNode(self.topogramId, { x:x, y:y, name: id })
      console.log("new node",n)
      Meteor.call("addNode", n)
    }

    this.graph.selectElement = function(el, type){
      Session.set('currentType', type)
      Session.set('currentId', el.id())

      self.graph.focusOnNodes(el)
      $('#infoBox').show()

      var url = self.graph.getElementUrl(el, type)
      FlowRouter.go(url)
    }


    this.graph.deselectAll = function(){
      Session.set('currentType', null)
      Session.set('currentId', null)
      Session.set('pathTargetNodeId', null)

      self.graph.unFocus()
      $('#infoBox').hide()
      $('#commentBox').hide()
      FlowRouter.go(window.location.pathname)
    }

    this.graph.getElementUrl = function(el, type) {
      // get node/edge _id
      var element
      if(type =="node") {
        element = Nodes.findOne({"data.id" : el.id()})
      } else if (type == "edge") {
        element = Edges.findOne({"data.id" : el.id()})
      }
      return window.location.pathname + "#"+type+"-"+element._id
    }

    this.graph.getElById = function(id, type){
      if(type == "node") {
        return self.graph.nodes().filter("[id='"+id+"']")
      } else if (type == "edge") {
        return self.graph.edges().filter("[id='"+id+"']")
      }
    }


    // mouse over
    mouseActions(self.graph)

    this.graph.drawPath = function( sourceNode, targetNode ) {
      console.log(self.graph, sourceNode, targetNode)
      self.graph.unFocus()
      var path = self.graph.elements().dijkstra(sourceNode).pathTo(targetNode)

      // self.graph.focusOnNodes(path)
      self.graph.nodes().style({ 'opacity': '.1' })
      self.graph.edges().style({ 'opacity': '.1' })
      path.style({ 'opacity': '1' })

      // make only the focus selectable
      self.graph.nodes().unselectify()
      self.graph.edges().unselectify(false)
      path.selectify()
    }

    // select / unselect nodes

    this.graph.focusOnNodes = function(selectedNodes){

      // select
      var subGraph = selectedNodes.closedNeighborhood()

      // make only the focus selectable
      self.graph.nodes().hide()
      self.graph.edges().hide()
      subGraph.show()

      // store actual position
      subGraph.nodes().forEach(function(d){
        var prevPos = Object({"x":d.position().x, "y":d.position().y})
        d.data("prevPos", prevPos)
      })

      // apply focus layout
      subGraph.layout({"name":"concentric"})
    }

    this.graph.unFocus = function(){

      // remove layout focus and re-apply previous positions
      self.graph.nodes().forEach(function(d){
        if( d.data("prevPos") ) {
          d.position(d.data("prevPos"))
          delete d.removeData("prevPos")
        }
      })
      self.graph.layout({"name":"preset"})
      // shopw everything
      self.graph.nodes().show()
      self.graph.edges().show()
    }

    this.graph.resetFilters = function() {

      self.graph.deselectAll()

      $(".network-search input").val("")

      self.graph.elements().deselect()
      self.graph.elements().show()

      // reset selector
      $(".filterByCategory").find("option:selected").removeAttr("selected")
      $('.filterByCategory select').material_select('destroy')
      $('.filterByCategory select').material_select()

      // update slider min / max
      var min = self.graph.nodes().minDegree()
      var max = self.graph.nodes().maxDegree()

      $("#filterByDegree")[0].noUiSlider.set([min, max])

      // $("#filterByDegree")[0].noUiSlider.updateOptions({
      //   range: {
      //     'min': min,
      //     'max': max
      //   }
      // })

    }

    // show / hide elements
    this.graph.selectElements = function(selectedEls) {

      self.graph.elements().hide()
      selectedEls.select()
      selectedEls.show()
      selectedEls.nodes().connectedEdges().show()  // show edge context
    }

    this.graph.filterGraph = function(filter){

      // init with all elements selected by default
      var alreadySelected = (self.graph.$(':selected').length) ? self.graph.$(':selected') : self.graph.elements()

      // console.log(alreadySelected.length)
      var newSelection = alreadySelected.filter(filter)
      // console.log(newSelection.nodes().length, newSelection.edges().length)

      self.graph.selectElements(newSelection)
    }

    // load node if hash
    // TODO : select by nodes is broken...
    if(window.location.hash) {
      var type = window.location.hash.split("-")[0].replace("#","")
      var elementId = window.location.hash.split("-")[1]
      var element
      console.log(type, elementId)
      if(type =="node") {
        element = Nodes.findOne({"_id" : elementId})
      } else if (type == "edge") {
        element = Edges.findOne({"_id" : elementId})
      }
      console.log(element)
      var el = self.graph.getElById(element.data.id, type)
      console.log(el)
      if(el) self.graph.selectElement(el, type)
    }

    // mode view-only
    if(!this.editMode) {
      self.graph.autolock(true)  // prevent drag
      startEdgehandles(self.graph) // interactive edge creation
      self.graph.edgehandles("disable")
    }

    // init actions based on existing rights
    initActions(self.graph)

    // set global var
    this.data.network.set(this.graph)
})


Template.network.destroyed = function() {
  console.log("hahah")
}
