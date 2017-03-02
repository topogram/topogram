import { Nodes } from '/imports/api/collections.js';

import {
  nodeCreateMany,
  nodeUpdate,
  nodeMove,
  nodeDeleteAll
} from '/imports/api/nodes/nodesMethods.js';

export const createNodes = (topogramId, nodes) => 
  nodeCreateMany.call({ topogramId, nodes })

export const updateNode = (nodeId, data) =>
  nodeUpdate.call({ nodeId, data })

export const moveNode = (nodeId, position) =>
  nodeMove.call({ nodeId, position })

export const deleteNodes = (nodeIds) =>
  nodeDeleteMany.call({ nodeIds })
