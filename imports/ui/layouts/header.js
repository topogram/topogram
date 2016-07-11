import './header.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { logger } from '../../logger.js'
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.header.helpers({
  isLoggedIn : function() {
    return Meteor.userId() ? true : false
  }
})

Template.header.events = {
  "click #login": function() {
    FlowRouter.go('/sign-in')
  }),
  "click #logout": function() {
      Meteor.logout(function(err) {
        if (err) throw err
        logger.log("logged out")
    })
  }
}
