import { Edges } from '/imports/api/collections.js'

import {
  edgeCreateMany,
  edgeUpdate,
  edgeDeleteMany
} from '/imports/api/edges/edgesMethods.js'

export const createEdges = (topogramId, edges) =>
  edgeCreateMany.call({ topogramId, edges })

export const updateEdge = (edgeId, data) =>
  edgeUpdate.call({ edgeId, data })

export const deleteEdges = (edgeIds) =>
  edgeDeleteMany.call({ edgeIds })
