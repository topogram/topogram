import './lab.html'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Nodes, Edges, Topograms } from '../../api/collections.js'

import  '../components/datalab/edges/edges.js'
import  '../components/datalab/nodesLab/nodesLab.js'

Template.lab.onCreated( function() {
  var self = this
  console.log(self);
  self.autorun(function() {
    // self.subscribe( 'topogram', this.data.topogramId() )
    self.subscribe( 'nodes', FlowRouter.getParam('topogramId') )
    self.subscribe( 'edges', FlowRouter.getParam('topogramId') )
  })
})

Template.lab.helpers({

  topogram: function() {
      var topogram = Topograms.findOne()
      // console.log(topogram)
      return topogram
  },

  hasNodes: function() {
      return Nodes.find().fetch().length > 0
  },

  hasEdges: function() {
      return Edges.find().fetch().length > 0
  },

  hasElements: function() {
      return Nodes.find().fetch().length > 0 || Edges.find().fetch().length > 0
  }

})
