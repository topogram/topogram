Datasets = new Mongo.Collection( 'datasets' );
Topograms = new Mongo.Collection( 'topograms' );
Comments = new Mongo.Collection( 'comments' );
Edges = new Mongo.Collection( 'edges' );
Nodes = new Mongo.Collection( 'nodes' );
// Users : handle by Meteor.users


// Transactions  config
tx.collectionIndex = {
    'nodes': Nodes,
    'edges': Edges
};
