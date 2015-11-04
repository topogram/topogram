makeEdge = function( topogramId, source, target, width, date, data ) {
    return {
        group: 'edges',
        data: {
            id: 'edge-' + Math.round( Math.random() * 1000000 ),
            'source': source,
            'target': target,
            data: data || {},
            name: ""
        },
        createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        topogramId: topogramId
    };
}

makeNode = function( topogramId, nodeId, x, y, lat, lng, width, date, data ) {
    return {
        group: 'nodes',
        data: {
            id: nodeId || " node-" + Date.now(),
            lat: lat || 0,
            lng: lng || 0,
            starred: false,
            data: data || {}
        },
        position: {
            x: x || Math.random() * 800,
            y: y || Math.random() * 600
        },
        topogramId: topogramId,
        createdAt: new Date(), // current time
        owner: Meteor.userId() // _id of logged in user
    };
};

slugify = function( text ) {
    return text.toString().toLowerCase()
        .replace( /\s+/g, '-' ) // Replace spaces with -
        .replace( /[^\w\-]+/g, '' ) // Remove all non-word chars
        .replace( /\-\-+/g, '-' ) // Replace multiple - with single -
        .replace( /^-+/, '' ) // Trim - from start of text
        .replace( /-+$/, '' ); // Trim - from end of text
};
