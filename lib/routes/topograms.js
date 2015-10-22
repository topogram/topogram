Router.route( '/topograms', {
    waitOn: function() {
        return Meteor.subscribe( 'topograms', Meteor.userId() );
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'topograms' );
    }
} );

Router.route( '/topograms/:topogramId', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'topogram', this.params.topogramId ),
            Meteor.subscribe( 'nodes', this.params.topogramId ),
            Meteor.subscribe( 'edges', this.params.topogramId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'single', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/view', {
    name: 'showTopogram',
    waitOn: function() {
        if ( Meteor.userId() ) return Meteor.subscribe( 'publicTopogram', this.params.topogramId );
        else return Meteor.subscribe( 'topogram', this.params.topogramId );
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'view', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/share', {
    waitOn: function() {
        return Meteor.subscribe( 'topogram', this.params.topogramId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'share', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/timeline', {
    waitOn: function() {
        return Meteor.subscribe( 'topogram', this.params.topogramId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'timeline', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/map', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'topogram', this.params.topogramId ),
            Meteor.subscribe( 'nodes', this.params.topogramId ),
            Meteor.subscribe( 'edges', this.params.topogramId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'map', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

Router.route( '/topograms/:topogramId/topogram', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'topogram', this.params.topogramId ),
            Meteor.subscribe( 'nodes', this.params.topogramId ),
            Meteor.subscribe( 'edges', this.params.topogramId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'topogramTemplate', {
            data: {
                "topogramId": this.params.topogramId
            }
        } );
    }
} );

// Router.route('/topograms/:topogramId/both', {
//     waitOn: function () {
//         return [
//             Meteor.subscribe('topogram', this.params.topogramId),
//             Meteor.subscribe('nodes', this.params.topogramId),
//             Meteor.subscribe('edges', this.params.topogramId)
//         ]
//     },
//     action: function () {
//         if (!this.ready())  this.render("loading");
//         else this.render('both', { data : {"topogramId" : this.params.topogramId} });
//     }
// });
