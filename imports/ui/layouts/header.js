import './header.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { logger } from '../../logger.js'

Template.header.helpers({
  isLoggedIn : function() {
    return Meteor.userId() ? true : false
  }
})

Template.header.events = {
  "click #logout": function() {
      Meteor.logout(function(err) {
        if (err) throw err
        logger.log("logged out")
    })
  }
}
