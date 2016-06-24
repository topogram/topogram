import './topograms-add.html'
import { Template } from 'meteor/templating'
import $ from "meteor/jquery"
import { Meteor } from 'meteor/meteor'
import { Router } from 'meteor/kadira:flow-router'
import { FlashMessages } from 'meteor/mrt:flash-messages'


Template.addTopogram.events( {
    'submit form': function( event ) {
        event.preventDefault()
        var topogramName = $( 'input[name="topogramName"]' ).val()
        console.log(topogramName)
        if ( topogramName != '' ) {
            Meteor.call( 'createTopogram', Meteor.userId(), topogramName, function(err, topogram){
              FlowRouter.go( '/topograms/' + topogram + '/import' )
            })

            $( '[name=topogramName]' ).val( '' )
        } else {
            FlashMessages.sendError( 'TopogramName should not be empty' )
        }
    }
} )
