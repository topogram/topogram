Router.route( '/networks/:networkId/import', {
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'import', {
            data: {
                "networkId": this.params.networkId,
                "type": "nodes"
            }
        } );
    }
} );

Router.route( '/networks/:networkId/nodes', {
    waitOn: function() {
        return Meteor.subscribe( 'nodesLab', this.params.networkId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'nodesTemplate', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

Router.route( '/networks/:networkId/edges', {
    waitOn: function() {
        return Meteor.subscribe( 'edges', this.params.networkId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'edgesTemplate', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );
