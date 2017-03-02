import { Nodes } from '/imports/api/collections.js';

import {
  nodeUpdate,
  nodeCreateMany,
  nodeDeleteAll
} from '/imports/api/nodes/nodesMethods.js';

export const createNodes = (topogramId, nodes) =>
  nodeCreateMany.call({
    topogramId,
    nodes : nodes.map( n =>  ({ ...d.element, ...d.data }))
  })

export const updateNode = (nodeId, data) =>
  nodeUpdate.call({ nodeId, data })

export const deleteNodes = (nodeIds) =>
  nodeDeleteMany.call({ nodeIds })
