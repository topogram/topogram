makeEdge = function( topogramId, el, rawData ) {
    var edge = makeGraphElement(topogramId, el, rawData)
    edge.group = 'edges';
    edge.id =  el.id || 'edge-' + Math.round( Math.random() * 1000000 ),
    edge.data.source = el.source;
    edge.data.target = el.target;
    return edge;
}

makeNode = function( topogramId, el, rawData ) {
    var node = makeGraphElement(topogramId, el, rawData)
    node.group = 'nodes';
    node.id =  el.id || " node-" + Math.round( Math.random() * 1000000 );
    node.position =  {
        x: el.x || Math.random() * 800,
        y: el.y || Math.random() * 600
    }
    return node;
};

var makeGraphElement = function (topogramId, el, rawData){
  return {
      data: {
          lat: el.lat || 0,
          lng: el.lng || 0,
          weight: el.weight || 0,
          start: el.start || 0,
          end: el.end || 0,
          starred: el.star || false,
          name: el.label || "",
          color: el.color || 0,
          group: el.group || 0,
          additionalInfo: el.additionalInfo || {},
          rawData : rawData
      },
      topogramId: topogramId,
      createdAt: new Date(), // current time
      owner: Meteor.userId() // _id of logged in user
  };
}
