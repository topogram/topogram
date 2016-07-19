import './shareBox.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Topograms } from '../../../../api/collections.js'
import { $ } from 'meteor/jquery'

Template.shareBox.helpers( {
  'sharedPublic' :function() {
    var t = Topograms.findOne()
    return (t) ? t.sharedPublic : false
  }
})

Template.shareBox.events( {
    "click .close" : function() {
      $("#shareBox").hide()
    },
    "change #shared-public": function( event ) {
        let topogramId = FlowRouter.getParam('topogramId')
        if ( event.target.checked ) Meteor.call( "makePublic", topogramId )
        else Meteor.call( "makePrivate", topogramId )
    }
} )
