import { Edges } from '/imports/api/collections.js'

import {
  edgeCreate,
  edgeDelete,
  edgeCreateMany,
  edgeUpdate,
  edgeDeleteAll
} from '/imports/api/edges/edgesMethods.js'

export const createEdges = (topogramId, edges) =>
  return edgeAddMany.call({
    topogramId,
    edges : edges.map( n =>  ({ ...d.element, ...d.data }))
  })

export const updateEdge = (edgeId, data) =>
  edgeUpdate.call({ edgeId, data })


export const deleteEdges = (edgeIds) =>
  edgeDeleteMany.call({ edgeIds })
