import './nodesLab.html'

import { Template } from 'meteor/templating'
import { Nodes } from '../../../../api/collections.js'
import { TabularTables } from '../../../../dataTables.js'
import { $ } from 'meteor/jquery'

Template.nodesLab.rendered = function() {
  // this.editor = new $.fn.dataTable.Editor( {} );
}

Template.nodesLab.events( {
  'click tbody td:not(:first-child)' : function(event, instance) {
    console.log(event, instance);
    // ed itor.inline( this );
  }
})

Template.nodesLab.helpers( {
    'nodes': function() {
        return Nodes.find()
    },
    'query': function() {
        // console.log( this )
        return {
            topogramId: this.topogramId
        }
    }
} )
