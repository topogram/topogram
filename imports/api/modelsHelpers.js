export const makeEdge = function ( topogramId, element, data, userId ) {
  const el = element || {}
  const rawData = data || {}
  const edge = makeGraphElement(el, rawData)
  edge.group = 'edges'
  edge.id =  el.id || 'edge-' + Math.round( Math.random() * 1000000 ),
    edge.data.source = el.source
  edge.data.target = el.target
  edge.owner = userId
  edge.topogramId = topogramId
  return edge
}

export const makeNode = function ( topogramId, element, data, userId ) {
  const el = element || {}
  const rawData = data || {}
  const node = makeGraphElement(el, rawData)
  node.group = 'nodes'
  node.data.id =  el.id || 'node-' + Math.round( Math.random() * 1000000 )
  node.position =  {
    x: el.x || Math.random() * 800,
    y: el.y || Math.random() * 600
  }
  node.owner = userId
  node.topogramId = topogramId
  return node
}

const makeGraphElement = function (el, rawData) {

  //check if rawData contains dot
  for (const key in rawData) {
    if (key.split('.').length > 1) {
      const newKey = key.replace('.', '_')
      rawData[newKey] = rawData[key]
      delete rawData[key]
    }
  }
  return {
    data: {
      lat: el.lat || 0,
      lng: el.lng || 0,
      weight: el.weight || 0,
      start: el.start || 0,
      end: el.end || 0,
      starred: el.star || false,
      name: el.label || el.name || '',
      color: el.color || 0,
      group: el.group || 0,
      additionalInfo: el.additionalInfo || {},
      rawData
    },
    createdAt: new Date() // current time
  }
}
