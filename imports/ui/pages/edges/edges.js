import './edges.html'

import '../../components/table/tableEdges.js'

import { Template } from 'meteor/templating'
import { Nodes } from '../../../api/collections.js'
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.edgesTemplate.created = function() {
  let self= this;
  self.autorun(function() {
    self.subscribe( 'edges', FlowRouter.getParam('topogramId') )
  })
}

Template.edgesTemplate.events( {
  'change #search' : function(event, instance) {
    console.log(event, instance);
  }
})

Template.edgesTemplate.helpers( {
    'edges': function() { return Nodes },
    'query': function() {
        return { topogramId: this.topogramId }
    },
    'fields' : function() {

    }
} )
