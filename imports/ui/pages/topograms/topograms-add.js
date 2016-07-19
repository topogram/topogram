import './topograms-add.html'
import { Template } from 'meteor/templating'
import { $ } from "meteor/jquery"
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { FlashMessages } from '../../flashMessages/flashMessages.js'


Template.addTopogram.events( {
    'submit form': function( event ) {
        event.preventDefault()
        var topogramName = $( 'input[name="topogramName"]' ).val()
        if ( topogramName != '' ) {
            Meteor.call( 'createTopogram', Meteor.userId(), topogramName, function(err, topogram){
              if(err) throw err
              if(topogram.status == "error") FlashMessages.sendError(topogram.message)
              else {
                FlowRouter.go( '/topograms/' + topogram + '/import' )
                // $( '[name=topogramName]' ).val( '' )
              }
            })


        } else {
            FlashMessages.sendError( 'TopogramName should not be empty' )
        }
    }
} )
