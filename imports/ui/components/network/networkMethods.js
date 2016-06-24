import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'

import { $ }  from 'meteor/jquery'
import cytoscape  from 'cytoscape'

// cytoscape extensions
import edgehandles from 'cytoscape-edgehandles'
import cxtmenu from 'cytoscape-cxtmenu'
import spread from "cytoscape-spread"

import { makeNode } from '../../../api/modelsHelpers.js'

// register extensions
edgehandles( cytoscape, $ )
cxtmenu( cytoscape, $ ) // register extension

// register layouts
// TODO: currently Cola requires  a build from Grunt...
// import cycola from "cytoscape-cola"
// import cola from 'webcola'
// cycola(cytoscape, webcola)
spread(cytoscape)

export const initGraph = function(domElement) {
  // console.log("init network")

  var graph = cytoscape({
    container: domElement,
    hideLabelsOnViewport: true,
    ready: function() {
      // console.log('topogram ready')
    },
    layout: {
        name: 'preset' // load saved positions
    }
  })
  return graph
}

export const initActions = function(graph) {

  var advancedEditMode = Session.get("advancedEditMode")
  console.log("init actions with advancedEditMode = "+ advancedEditMode)

  // drag node
  graph.off('free', 'node')  // reset
  graph.on('free', 'node', function(e) {
      var node = e.cyTarget

      // update position
      Meteor.call('updateNodePosition', node.id(), node.position())

      // Node Merger
      if(advancedEditMode) {
          // check for node merger
          console.log("check for node merger")
          Session.set("mergeSource", null)
          Session.set("mergeTargets", null)

          // hit test
          var bb = node.boundingbox()
          var targets = graph.nodes().filterFn(function(d){
              var isPos =
                d.position().x > bb.x1
                &&
                d.position().x < bb.x2
                &&
                d.position().y > bb.y1
                &&
                d.position().y < bb.y2
              var isSame = (d.id() == node.id())
              return isPos && !isSame
          })

          // console.log(node, targets)
          if (targets.length) {
              Session.set("mergeSource", node.id())
              Session.set("mergeTargets", targets.map(function(d){return d.id()}))
              $('#modal-merge').openModal()
          }
      }
  })

  // edge creation: disabled by default
  if (!advancedEditMode) graph.edgehandles("disable")
  else graph.edgehandles("enable")

  // context menu (right click)

  if(self.editMode) {
    var commands =  [{
        content: '<span><i class="small material-icons">star_rate</i></span>',
        select: function() {
          Meteor.call('starNode', this.id())
          var starred = (this.data("starred")) ? false : true
          this.data("starred", starred)
        }
    // }, {
    //     content: '<span><i class="small material-icons">lock</i></span>',
    //     select: function() {
    //         // console.log( this.position() )
    //         Meteor.call('lockNode', this.id(), this.position())
    //     },
    },{
        content: '<span><i class="small material-icons">comment</i></span>',
        select: function() {
            graph.selectElement(this, "node")
            $("#commentBox").show()
        }

    },{
        content: '<span><i class="small material-icons">library_books</i></span>',
        select: function() {
          // TODO : share to social networks
          graph.selectElement(this, "node")
        }

    }]

    // add delete only on advanced mode
    if(advancedEditMode)
      commands.push({
        content: '<span><i class="small material-icons">delete</i></span>',
        select: function() {

            // remove the node plus all connected edges
            Meteor.call('deleteNodeAndConnectedEdges', this.id(), this.neighborhood('edge').map(function(d) {
                return d.id()
            }))

            // remove from graph
            graph.remove(this.neighborhood('edge'))
            graph.remove(this)
        }
    })

    // update ctx menu
    if (graph.cxtMenuAPI) graph.cxtMenuAPI.destroy()
    graph.cxtMenuAPI = graph.cxtmenu({
      selector: 'node',
      commands: commands
    })
  }
}

/**
* Apply a default stylesheet to the Graph
*
*/
export const applyDefaultStyle = function(graph) {
  console.log(graph)
    graph.style()
      .resetToDefault()
      .selector('node')
        .style({
          'font-size': 6,//this.graphState.fontSize,
          'text-valign': 'center',
          'text-halign': 'right',
          'color': 'gray',
          'text-max-width': 60,
          'text-wrap': 'wrap',
          'min-zoomed-font-size': 0.4,
          'background-color' : function(e) {
            var color = "#CCC"  // default
            if (e.data("group")) color = colors(e.data("group"))
            else if (e.data("color")) color = e.data("color")
            return e.data('starred') ? 'yellow' : color
          },
          // 'text-opacity' : 0, // hide label by default
          'label': function(e) {
            return e.data("name") ? e.data("name").trunc(20) : ""
          }
        })
      // node with degree zero
      .selector('node[[degree = 0]]')
        .style({
            'background-color': '#656565'
            // 'display' :"none"
        })
      .selector('edge')
        .style({
          'background-color' : "#000",
          'target-arrow-shape': 'none', // default is undirected graph
          'width': function(e) {
            return e.data("weight") ? e.data("weight") : .5
          },
          'line-color' : '#AAAAAA',
          'line-opacity': .7,
          'font-size':8,
          'text-opacity' : 0, // hide label by default
          'label': function(e) {
            return e.data("group") ? e.data("group") : ""
          }
        })
      .selector('.edgehandles-hover')
        .style({
            'background-color': 'red'
        })
      .selector('.edgehandles-source')
      .selector('.edgehandles-target')
      .selector('.edgehandles-preview, .edgehandles-ghost-edge')
        .style({
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red'
        })
}

export const mouseActions = function(graph) {
  graph.on('mouseover', 'node', function(e) {
      e.cyTarget.style({
        'border-width': 2,
        'border-color': '#D84315',
        'font-size' : 8,
        'color' : 'black',
        'label': function(d) {
          return d.data("name") ? d.data("name") : ""
        },
        'z-index': 300000
      })
  })
  graph.on('mouseout', 'node', function(e) {
      e.cyTarget.style({
        'border-width': 0,
        'font-size' : 6,
        'color' : 'gray',
        'label': function(d) {
          return d.data("name") ? d.data("name").trunc(20) : ""
        }
      })
  })
}

export const startEdgehandles = function(graph ) {

  graph.edgehandles({
    complete: function(source, target, addedEntities) {
      console.log(source, target, addedEntities)
        Meteor.call('addEdgeFromIds', self.topogramId, source.data('id'), target.data('id'))
    }
  })
}

/**
* Remove singletons from Graph
*
*/
export const removeSingletons = function(graph) {
  graph.elements('node[[degree = 0]]').remove()
}


/*
* Add a bunch of edges and nodes to the graph
*/

export const initGraphNodesEdges = function(graph, nodes, edges) {

  graph.add(nodes)

  //make sure all nodes referenced in edges actually exists
  var nodeIds = nodes.map(function(n){return n.data.id})

  // Add ghost nodes for non-existing nodes
  var ghostsIds = []
  var edges = edges.filter(function(e){
    if (nodeIds.indexOf(e.data.source) == -1 && ghosts.indexOf(e.data.source) == -1)
      ghostsIds.push(e.data.source)
    if (nodeIds.indexOf(e.data.target) == -1 && ghosts.indexOf(e.data.target) == -1)
      ghostsIds.push(e.data.target)
  })

  console.log(ghostsIds);
  console.log("ghost nodes", ghostsIds.length)
  var ghosts = ghostsIds.map(function(id){
    return createGhostNode(id)
  })

  console.log(ghosts);

  graph.add(edges)

}

const createGhostNode = function(id) {
  // TODO : style ghosts
  return makeNode(undefined, { 'id' : id}, {'group' : 'ghosts'})
}
