import './nodes.html'

import '../../components/table/tableNodes.js'

import { Template } from 'meteor/templating'
import { Nodes } from '../../../api/collections.js'
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.nodesTemplate.created = function() {
  let self= this;
  self.autorun(function() {
    self.subscribe( 'nodes', FlowRouter.getParam('topogramId') )
  })
}

Template.nodesTemplate.events( {
  'change #search' : function(event, instance) {
    console.log(event, instance);
  }
})

Template.nodesTemplate.helpers( {
    'nodes': function() { return Nodes },
    'query': function() {
        return { topogramId: this.topogramId }
    },
    'fields' : function() {

    }
} )
