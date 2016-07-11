import './header.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
/*
import { logger } from '../../logger.js'
*/

Template.header.helpers({
  isLoggedIn : function() {
    return Meteor.userId() ? true : false
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
