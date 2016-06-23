import { Meteor } from 'meteor/meteor'
import { Restivus } from 'meteor/nimble:restivus'
import { Topograms } from './collections.js'
import { logger } from '../logger.js'


// Global API configuration
 var Api = new Restivus({
  apiPath: "api",
  useDefaultAuth: true,
  prettyJson: true,
  onLoggedIn: function () {
    logger.log(this.user.username + ' (' + this.userId + ') logged in')
  },
  onLoggedOut: function () {
    logger.log(this.user.username + ' (' + this.userId + ') logged out')
  }
 })

 // Generates: GET, POST on /api/items and GET, PUT, DELETE on
 // /api/items/:id for the Items collection
 Api.addCollection(Topograms, {
   routeOptions: {
     authRequired: true
   },
   endpoints: {
     getAll: {
       action: function () {
         return Topograms.find({ "owner": this.userId}).fetch()
       }
     }
  }
})

 // Generates: POST on /api/users and GET, DELETE /api/users/:id for
 // Meteor.users collection
 Api.addCollection(Meteor.users, {
   excludedEndpoints: ['getAll', 'put'],
   routeOptions: {
     authRequired: true
   },
   endpoints: {
     post: {
       authRequired: false
     },
     delete: {
       roleRequired: 'admin'
     }
   }
 })
