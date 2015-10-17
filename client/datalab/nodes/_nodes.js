// networks index
Template.nodesTemplate.helpers( {
    'nodes': function() {
        return nodes = Nodes.find();
    },
    'query': function() {
        // console.log( this );
        return {
            networkId: this.networkId
        };
    }
} );
