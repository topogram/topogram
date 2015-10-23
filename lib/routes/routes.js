// Default routing settings
Router.configure( {
    layoutTemplate: 'mainLayout',
    notFoundTemplate: '404'
} );


Router.route( '/', {
    name: 'root',
    waitOn: function() {
        return [ 
            Meteor.subscribe( 'publicTopograms' ),
            Meteor.subscribe( 'topograms', Meteor.userId )
        ];
    },
    action: function() {
        if ( !this.ready() ) this.render( 'loading' );
        else this.render( 'home' );
    }
} );

Router.route( '/login', {
    action: function() {
        // this.render( 'login' );
        this.render( 'fullPageAtForm' );
    }
} );
