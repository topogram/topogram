import { Meteor } from 'meteor/meteor'
import { Restivus } from 'meteor/nimble:restivus'
import { Topograms } from './collections.js'
import { logger } from '../logger.js'
import { Accounts } from 'meteor/accounts-base'


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

  Api.addRoute('', {authRequired: false}, {
    get: function () {
      return { "message" : "API works"};
    },
  })

  Api.addRoute('publicTopograms', {authRequired: false}, {
    get: function () {
      return Topograms.find({ "sharedPublic": 1}).fetch();
    },
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
       authRequired: false,
       action: function () {
         var data = this.bodyParams
         var user = Meteor.users.find({ "emails.address": data.email}).fetch()
         console.log(user);
         if (user.length) {
           return {
            "status": "error",
            "message": "Unauthorized - Email already exists"
          }
        } else {
          Accounts.createUser(data)
          var user = Meteor.users.findOne({ "emails.address": data.email})
          console.log(user);
          return {
           "status": "success",
           "data" : { "_id" : user._id}
          }
        }
       }

     },
     delete: {
       roleRequired: 'admin'
     }
   }
 })
