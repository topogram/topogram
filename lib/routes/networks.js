Router.route( '/networks', {
    waitOn: function() {
        return Meteor.subscribe( 'networks', Meteor.userId() )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'networks' );
    }
} );

Router.route( '/networks/:networkId', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'network', this.params.networkId ),
            Meteor.subscribe( 'nodes', this.params.networkId ),
            Meteor.subscribe( 'edges', this.params.networkId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'single', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

Router.route( '/networks/:networkId/view', {
    name: "showNetwork",
    waitOn: function() {
        if ( Meteor.userId() ) return Meteor.subscribe( 'publicNetwork', this.params.networkId );
        else return Meteor.subscribe( 'network', this.params.networkId );
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'view', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

Router.route( '/networks/:networkId/share', {
    waitOn: function() {
        return Meteor.subscribe( 'network', this.params.networkId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'share', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

Router.route( '/networks/:networkId/timeline', {
    waitOn: function() {
        return Meteor.subscribe( 'network', this.params.networkId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'timeline', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

Router.route( '/networks/:networkId/map', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'network', this.params.networkId ),
            Meteor.subscribe( 'nodes', this.params.networkId ),
            Meteor.subscribe( 'edges', this.params.networkId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'map', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

Router.route( '/networks/:networkId/network', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'network', this.params.networkId ),
            Meteor.subscribe( 'nodes', this.params.networkId ),
            Meteor.subscribe( 'edges', this.params.networkId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" );
        else this.render( 'networkTemplate', {
            data: {
                "networkId": this.params.networkId
            }
        } );
    }
} );

// Router.route('/networks/:networkId/both', {
//     waitOn: function () {
//         return [
//             Meteor.subscribe('network', this.params.networkId),
//             Meteor.subscribe('nodes', this.params.networkId),
//             Meteor.subscribe('edges', this.params.networkId)
//         ]
//     },
//     action: function () {
//         if (!this.ready())  this.render("loading");
//         else this.render('both', { data : {"networkId" : this.params.networkId} });
//     }
// });
