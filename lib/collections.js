Networks = new Mongo.Collection("networks");
Comments = new Mongo.Collection("comments");
Edges = new Mongo.Collection("edges");
Nodes = new Mongo.Collection("nodes");
// Users : handle by Meteor.users


// Transactions  config
tx.collectionIndex = {'nodes': Nodes, 'edges': Edges};
