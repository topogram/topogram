Router.route( '/topograms/:topogramId/import', {
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'import', {
            data: {
                "topogramId": this.params.topogramId,
                "type": "nodes"
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/nodes', {
    waitOn: function() {
        return Meteor.subscribe( 'nodesLab', this.params.topogramId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'nodesTemplate', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/edges', {
    waitOn: function() {
        return Meteor.subscribe( 'edges', this.params.topogramId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'edgesTemplate', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );
