import {
  nodeCreateMany,
  nodeUpdate,
  nodeMove,
  nodeDeleteMany
} from '/imports/api/nodes/nodesMethods.js'

export const createNodes = (topogramId, nodes) =>
  nodeCreateMany.call({ topogramId, nodes })

export const updateNode = (nodeId, data) =>
  nodeUpdate.call({ nodeId, data })

export const moveNode = (nodeId, position, topogramId) =>
  nodeMove.call({ nodeId, position, topogramId })

export const deleteNodes = (nodeIds) =>
  nodeDeleteMany.call({ nodeIds })
