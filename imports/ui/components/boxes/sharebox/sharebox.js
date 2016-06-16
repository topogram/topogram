import './sharebox.html'
import { Template } from 'meteor/templating'

import { Topograms } from '../../../../api/collections.js'


Template.sharebox.helpers( {
  'sharedPublic' :function() {
    var t = Topograms.findOne();
    return t.sharedPublic
  }
})

Template.sharebox.events( {
    "click .close" : function(e) {
      $("#sharebox").hide();
    },
    "change #shared-public": function( event ) {
        console.log(event.target.checked);
        if ( event.target.checked ) Meteor.call( "makePublic", this.topogramId );
        else Meteor.call( "makePrivate", this.topogramId );
    }
} );
