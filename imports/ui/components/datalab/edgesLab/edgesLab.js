import './edgesLab.html'
import { Template } from 'meteor/templating'

Template.edgesLab.helpers( {
    'query': function() {
        // console.log( this )
        return {
            topogramId: this.topogramId
        }
    }
} )
