import './topograms-index.html'

import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Topograms } from '../../../api/collections.js'
import { Session } from 'meteor/session'
import $ from "meteor/jquery"
import moment from 'moment'

import './topograms-add.js'

Template.topograms.onCreated( function() {
  this.subscribe('topograms.private')
})


Template.topograms.events( {
    'click .delete': function( event ) {
        event.preventDefault()
        var id = Session.get( 'toDelete' )
        Meteor.call( 'deleteTopogram', id )
        Session.set( 'toDelete', '' )
    },
    'click .modal-delete-open': function( event ) {
        $( '#modal-delete' ).openModal()
        var id = $( event.target ).data( 'modal-template' )
        // console.log( id )
        Session.set( 'toDelete', id )
    },
    'click .modal-delete-close': function() {
        $( '#modal-delete' ).closeModal()
    }
} )

Template.topograms.helpers( {
    topograms: function() {
        return Topograms.find().fetch().map( function( d, i ) {
            d.index = i + 1
            d.privacy = d.sharedPublic ? 'Public' : 'Private'
            d.date = moment( d.createdAt ).format( 'MMMM Do YYYY, h:mm:ss a' )
            return d
        } )
    }
} )
