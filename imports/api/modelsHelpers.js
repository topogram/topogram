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
      lat: el.lat || null,
      lng: el.lng || null,
      weight: el.weight || null,
      start: el.start || null,
      end: el.end || null,
      starred: el.star || false,
      name: el.label || el.name || '',
      color: el.color || null, 
      group: el.group || null,
      additionalInfo: el.additionalInfo || ""
    },
    createdAt: new Date() // current time
  }
}


export const makeEdge = function ( topogramId, element, data ) {
  const el = element || {}
  const rawData = data || {}
  const edge = makeGraphElement(el, rawData)
  edge.group = 'edges'
  edge.data.id =  el.id || 'edge-' + Math.round( Math.random() * 1000000 )
  edge.data.source = el.source
  edge.data.target = el.target
  edge.topogramId = topogramId
  return edge
}

export const makeNode = function ( topogramId, element, data ) {
  console.log(topogramId, element, data);
  const el = element || {}
  const rawData = data || {}
  const node = makeGraphElement(el, rawData)
  console.log(node)
  node.group = 'nodes'
  node.data.id =  el.id || 'node-' + Math.round( Math.random() * 1000000 )
  node.position =  {
    x: el.x || Math.floor(Math.random() * 800),
    y: el.y || Math.floor(Math.random() * 600)
  }
  node.topogramId = topogramId
  return node
}
