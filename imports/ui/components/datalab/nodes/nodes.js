import './nodes.html'

import { Template } from 'meteor/templating'
import { Nodes } from '../../../../api/collections.js'
import { TabularTables } from '../../../../dataTables.js'

// topograms index
Template.nodesTemplate.helpers( {
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
