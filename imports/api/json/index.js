import { Restivus } from 'meteor/nimble:restivus'
import logger from '/imports/logger.js'

import { getTopograms, createTopogram } from '/imports/api/json/topograms'
import { createNodes } from '/imports/api/json/nodes'

import { Topograms, Nodes, Edges } from '/imports/api/collections.js'

// Global API configuration
export const Api = new Restivus({
  apiPath: 'api',
  useDefaultAuth: true,
  prettyJson: true,
  onLoggedIn() {
    logger.log(this.user.username + ' (' + this.userId + ') logged in')
  },
  onLoggedOut() {
    logger.log(this.user.username + ' (' + this.userId + ') logged out')
  }
})

// API Answers
const buildSuccessAnswer = function (data) {
  return {
    status : 'success',
    data : data
  }
}

// Home
Api.addRoute('',
  { authRequired: false },
  { get() { return { 'message' : 'API works' } } }
)

// Topograms
Api.addCollection(Topograms, {
  routeOptions: {
    authRequired: false
  },
  endpoints: {
    post: {
      statusCode : 201,
      action() {
        let data = createTopogram({ name : this.bodyParams.name })
        return buildSuccessAnswer(data)
      }
    },
    getAll: {
      action() {
        let data = Topograms.find().fetch()
        return buildSuccessAnswer(data)
      }
    }
    // ,delete: {}
  }
})

// Nodes
Api.addCollection(Nodes, {
  routeOptions: { authRequired: false },
  endpoints: {
    post: {
      statusCode : 201,
      action() {
        const nodes = this.bodyParams.nodes
        const topogramId = this.bodyParams.topogramId
        createNodes.call({topogramId, nodes})
        return buildSuccessAnswer(data)
      }
    },
    put : {
      action() {
        const nodeId = this.urlParams.id
        const data = this.bodyParams
        let res = updateNode.call({nodeId, data})
        return buildSuccessAnswer(res)
      }
    }
  }
})

Api.addRoute('nodes/delete', {
  post : {
    authRequired: false,
    action() {
      const nodeIds = this.bodyParams.nodes
      let data = nodeDeleteMany.call(nodeIds)
      // Nodes.find({ '_id' : { $in : ids } }).fetch()
      return buildSuccessAnswer(data)
    }
  }
})

Api.addRoute('topograms/:_id/nodes', {
  get: {
    authRequired: false,
    action() {
      const _id = this.urlParams._id
      const data = Nodes.find({ 'topogramId' : _id }).fetch()
      return buildSuccessAnswer(data)
    }
  }
})

// Edges
Api.addCollection(Edges, {
  routeOptions: { authRequired: false },
  endpoints: {
    post: {
      action() {
        const edges = this.bodyParams.edges
        const topogramId = this.bodyParams.topogramId
        const data = createEdges( topogramId, edges )
        return buildSuccessAnswer(data)
      }
    },
    put : {
      action() {
        const edgeId = this.urlParams.id
        const data = this.bodyParams
        let res = updateEdge(nodeId, data)
        return buildSuccessAnswer(res)
      }
    }
  }
})

Api.addRoute('edges/delete', {
  post : {
    authRequired: false,
    action() {
      const edgeIds = this.bodyParams.edges
      let data = deleteEdges(edgeIds)
      // Edges.find({ '_id' : { $in : ids } }).fetch()
      return buildSuccessAnswer(data)
    }
  }
})

Api.addRoute('topograms/:_id/edges', {
  get: {
    authRequired: false,
    action() {
      const _id = this.urlParams._id
      const data = Edges.find({ 'topogramId' : _id }).fetch()
      return buildSuccessAnswer(data)
    }
  }
})
