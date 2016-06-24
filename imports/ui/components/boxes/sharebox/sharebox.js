import './sharebox.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Topograms } from '../../../../api/collections.js'
import { $ } from 'meteor/jquery'

Template.sharebox.helpers( {
  'sharedPublic' :function() {
    var t = Topograms.findOne()
    return (t) ? t.sharedPublic : false 
  }
})

Template.sharebox.events( {
    "click .close" : function() {
      $("#sharebox").hide()
    },
    "change #shared-public": function( event ) {
        console.log(event.target.checked)
        if ( event.target.checked ) Meteor.call( "makePublic", this.topogramId )
        else Meteor.call( "makePrivate", this.topogramId )
    }
} )
