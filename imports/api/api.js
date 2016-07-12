import { Meteor } from 'meteor/meteor'
import { Restivus } from 'meteor/nimble:restivus'
import { Nodes, Edges, Topograms } from './collections.js'
import { logger } from '../logger.js'
import { Accounts } from 'meteor/accounts-base'

import { makeNode, makeEdge } from './modelsHelpers.js'

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
  post: {
    authRequired: true,
    action : function () {
      var _id = this.urlParams._id
      Meteor.call("makePrivate", _id)
      return {
         "status": "success",
         "data" : Topograms.findOne(_id)
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

Api.addRoute('topograms/:_id/nodes', {
   get: {
     authRequired: true,
     action : function () {
       var _id = this.urlParams._id
       return {
          "status": "success",
          "data" : Nodes.find({"topogramId" : _id }).fetch()
       }
     }
   }
 })

Api.addRoute('topograms/:_id/edges', {
  get: {
    authRequired: true,
    action : function () {
      var _id = this.urlParams._id
      return {
         "status": "success",
         "data" : Edges.find({"topogramId" : _id }).fetch()
      }
    }
  }
})

// nodes
Api.addCollection(Nodes, {
  routeOptions: {
    authRequired: true
  },
  endpoints: {
    post: {
      action: function () {
        var nodes = this.bodyParams.nodes
        var topogramId = this.bodyParams.topogramId
        if (nodes.length == 1) {
          var node = makeNode(topogramId, nodes[0].element, nodes[0].data, this.userId)
          var _id = Meteor.call( "addNode", node)
          return {
           "status": "success",
           "data": Nodes.findOne(_id)
          }
        } else {
          var self= this
          var nodesBuilt = nodes.map(function(d){ return makeNode(topogramId, d.element, d.data, self.userId) })
          var _ids = Meteor.call( "batchInsertNodes", nodesBuilt)
          return {
           "status": "success",
           "data": Nodes.find({"_id" : { $in : _ids }}).fetch()
          }

        }
      }
    },
  put : {
    action : function() {
      var data = this.bodyParams
      var node = Nodes.findOne(this.urlParams.id)
      for (var key in data) {
        if(key == "x") node.position.x = data.x
        else if(key == "y") node.position.y = data.y
        else if(key == "id") node.data.id = data.id
        else if(key == "data") {
          for(var k in data.data) {
            node.data[k] = data.data[k]
          }
        }
      }
      Nodes.update(this.urlParams.id, node)
      return {
       "status": "success",
       "data": Nodes.findOne(this.urlParams.id)
      }

    }
  }
  }
})

Api.addRoute('nodes/delete', {
  post : {
    authRequired: true,
    action :function() {
      var ids = this.bodyParams.nodes
      Nodes.remove({"_id" : { $in : ids }})
      return {
       "status": "success",
       "data": Nodes.find({"_id" : { $in : ids }}).fetch()
      }
    }
  }
})

// Edges
Api.addCollection(Edges, {
  routeOptions: {
    authRequired: true
  },
  endpoints: {
    post: {
      action: function () {
        var edges = this.bodyParams.edges
        var topogramId = this.bodyParams.topogramId
        if (edges.length == 1) {
          var edge = makeEdge(topogramId, edges[0].element, edges[0].data, this.userId)
          var _id = Meteor.call( "addEdge", edge)
          return {
           "status": "success",
           "data": Edges.findOne(_id)
          }
        } else {
          var self= this
          var edgesBuilt = edges.map(function(d){ return makeEdge(topogramId, d.element, d.data, self.userId) })
          var _ids = Meteor.call( "batchInsertEdges", edgesBuilt)
          return {
           "status": "success",
           "data": Edges.find({"_id" : { $in : _ids }}).fetch()
          }

        }
      }
    },
  put : {
    action : function() {
      var data = this.bodyParams
      var edge = Edges.findOne(this.urlParams.id)
      for (var key in data) {
        if(key == "source") edge.source = data.source
        else if(key == "target") edge.target = data.target
        else if(key == "id") edge.data.id = data.id
        else if(key == "data") {
          for(var k in data.data) {
            edge.data[k] = data.data[k]
          }
        }
      }
      Edges.update(this.urlParams.id, edge)
      return {
       "status": "success",
       "data": Edges.findOne(this.urlParams.id)
      }
    }
  }
}
})

Api.addRoute('edges/delete', {
  post : {
    authRequired: true,
    action :function() {
      var ids = this.bodyParams.edges
      Edges.remove({"_id" : { $in : ids }})
      return {
       "status": "success",
       "data": Edges.find({"_id" : { $in : ids }}).fetch()
      }
    }
  }
})
