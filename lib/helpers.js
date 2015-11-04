makeEdge = function( topogramId, source, target, width, date, nameE, color, repMethod, arrow, data ) {
    return {
        group: 'edges',
        data: {
            id: 'edge-' + Math.round( Math.random() * 1000000 ),
            'source': source,
            'target': target,
            data: data || {},
            width: width || 0,
            date: date || 0,
            name: nameE || "",
            color: color || 0,
            repMethod: repMethod || false,
            arrow: arrow || 0
        },
        createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        topogramId: topogramId
    };
}

makeNode = function( topogramId, nodeId, x, y, lat, lng, width, date, nameE,color, repMethod, star, data ) {
    return {
        group: 'nodes',
        data: {
            id: nodeId || " node-" + Date.now(),
            lat: lat || 0,
            lng: lng || 0,
            width: width || 0,
            date: date || 0,
            starred: star || false,
            name: nameE || "",
            color: color || 0,
            repMethod: repMethod || false,
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
