// Datasets = new Mongo.Collection( 'datasets' );
export const Topograms = new Mongo.Collection( 'topograms' );
export const Comments = new Mongo.Collection( 'comments' );
export const Edges = new Mongo.Collection( 'edges' );
export const Nodes = new Mongo.Collection( 'nodes' );
// Users : handle by Meteor.users


// Transactions  config
tx.collectionIndex = {
    'nodes': Nodes,
    'edges': Edges
};
