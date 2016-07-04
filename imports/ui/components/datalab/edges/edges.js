import './edges.html'
import { Template } from 'meteor/templating'

Template.edgesTemplate.helpers( {
    'query': function() {
        // console.log( this )
        return {
            topogramId: this.topogramId
        }
    }
} )
