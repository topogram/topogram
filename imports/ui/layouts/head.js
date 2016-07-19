import "./head.html"
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

Template.head.onCreated( function () {
  Meteor.call("getVersion", (err, data) => {
    if (err) throw err
    console.log(data)
    Session.set("version", data)
  })
})
