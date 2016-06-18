import './nodes.html'

import { Template } from 'meteor/templating'
import { Nodes } from '../../../../api/collections.js'
import { TabularTables } from '../../../../dataTables.js'

console.log(TabularTables) 

// topograms index
Template.nodesTemplate.helpers( {
    'nodes': function() {
        return nodes = Nodes.find() 
    },
    'query': function() {
        // console.log( this ) 
        return {
            topogramId: this.topogramId
        } 
    }
} ) 
