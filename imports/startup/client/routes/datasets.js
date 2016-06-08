Router.route( '/datasets', {
    waitOn: function() {
        return Meteor.subscribe( 'datasets', Meteor.userId() );
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'datasets' );
    }
} );

Router.route( '/datasets/new', {
    waitOn: function() {
        return Meteor.subscribe( 'datasets', Meteor.userId() );
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'createDataset');
    }
} );
