import './header.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Session } from 'meteor/session'

/*
import { logger } from '../../logger.js'
*/

Template.header.helpers({
  isLoggedIn : function() {
    return Meteor.userId() ? true : false
  },
  isNotEmbedView() {
    return Session.get('embedView') == "1" ? false : true
  }
})


Template.header.events = {
  'click #login': function() {
    console.log("sing in");
    FlowRouter.go('/sign-in')
  },
  'click #logout': function() {
      Meteor.logout(function(err) {
        if (err) throw err
        FlowRouter.go('/')
    })
  }
}
