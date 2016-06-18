import './edges.html'
import { Template } from 'meteor/templating'
import { TabularTables } from '../../../../dataTables.js'

Template.edgesTemplate.helpers( {
    'query': function() {
        // console.log( this ) 
        return {
            topogramId: this.topogramId
        }
    }
} )
