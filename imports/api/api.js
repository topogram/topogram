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
     post: {
      statusCode : 201,
      action: function() {
        var _id = Meteor.call('createTopogram', this.userId, this.bodyParams.name)
        return {
         "status": "success",
         "data" : Topograms.findOne(_id)
       }
      }
     },
     getAll: {
       action: function () {
         return {
          "status": "success",
          "data" : Topograms.find({ "owner": this.userId }).fetch()
        }
       }
     }
     /*,
     delete : {
       action: function() {
         var _id = Meteor.call("deleteTopogram", this.bodyParams._id)
         return {
          "status": "success",
          "data" : Topograms.findOne(_id)
        }
       }
     }
     */
  }
})

Api.addRoute('topograms/:_id/public', {
  post: {
    authRequired: true,
    action : function () {
      var _id = this.urlParams._id
      Meteor.call("makePublic", _id)
      return {
         "status": "success",
         "data" : Topograms.findOne(_id)
      }
    }
  }
})

Api.addRoute('topograms/:_id/private', {
  post: function () {
    var _id = this.urlParams._id
    Meteor.call("makePrivate", _id)
    return {
       "status": "success",
       "data" : Topograms.findOne(_id)
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
         if (user.length) {
           return {
            "status": "error",
            "message": "Unauthorized - Email already exists"
          }
        } else {
          Accounts.createUser(data)
          var user = Meteor.users.findOne({ "emails.address": data.email})
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
