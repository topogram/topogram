
// Import to load these templates and layout
import '../../../ui/layouts/networkLayout.js'
import '../../../ui/pages/topograms/topograms-single.js'
import '../../../ui/pages/topograms/topograms-index.js'
import '../../../ui/pages/topograms/topograms-view.js'
import '../../../ui/pages/import.js'
import '../../../ui/pages/lab.js'
import '../../../ui/pages/lab.js'

Router.route( '/topograms', {
    waitOn: function() {
        return Meteor.subscribe( 'topograms', Meteor.userId() )
    },
    action: function() {
      // console.log()
        if ( !this.ready() ) this.render( "loading" )
        else this.render( 'topograms' )
    }
} )


Router.route( '/topograms/:topogramId', {
    waitOn: function() {
        return [
          Meteor.subscribe( 'topogram', this.params.topogramId ),
          Meteor.subscribe( 'nodes', this.params.topogramId ),
          Meteor.subscribe( 'edges', this.params.topogramId )
        ]
    },
    action: function() {
        this.layout("networkLayout")
        if ( !this.ready() ) this.render( "loading" )
        else this.render( 'single', {
            data: {
                "topogramId": this.params.topogramId
            }
        } )
    }
} )

Router.route( '/topograms/:topogramId/lab', {
    waitOn: function() {
        return [
            Meteor.subscribe( 'topogram', this.params.topogramId ),
            Meteor.subscribe( 'nodes', this.params.topogramId ),
            Meteor.subscribe( 'edges', this.params.topogramId )
        ]
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" )
        else this.render( 'lab', {
            data: {
                "topogramId": this.params.topogramId
            }
        } )
    }
} )

Router.route( '/topograms/:topogramId/view', {
    name: 'showTopogram',
    waitOn: function() {
        return [
          Meteor.subscribe( 'topogram', this.params.topogramId ),
          Meteor.subscribe( 'nodes', this.params.topogramId ),
          Meteor.subscribe( 'edges', this.params.topogramId )
        ]
    },
    action: function() {
        this.layout("networkLayout")
        if ( !this.ready() ) this.render( "loading" )
        else this.render( 'view', {
            data: {
                "topogramId": this.params.topogramId
            }
        } )
    }
} )

Router.route( '/topograms/:topogramId/import', {
    action: function() {
        if ( !this.ready() ) this.render( "loading" )
        else this.render( 'import', {
            data: {
                "topogramId": this.params.topogramId,
                "type": "nodes"
            }
        } )
    }
} )

Router.route( '/topograms/:topogramId/timeline', {
    waitOn: function() {
        return Meteor.subscribe( 'topogram', this.params.topogramId )
    },
    action: function() {
        if ( !this.ready() ) this.render( "loading" )
        else this.render( 'timeline', {
            data: {
                "topogramId": this.params.topogramId
            }
        } )
    }
} )
