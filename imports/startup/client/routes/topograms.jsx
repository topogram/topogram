import { FlowRouter } from 'meteor/kadira:flow-router'
import { AccountsTemplates } from 'meteor/useraccounts:core'
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session'

// translations
import '../i18n.js'

// Import to load these templates and layout
import '../../../ui/layouts/mainLayout.js'
import '../../../ui/layouts/networkLayout.js'
import '../../../ui/pages/topograms/topograms-edit.js'
import '../../../ui/pages/topograms/topograms-index.js'
import '../../../ui/pages/topograms/topograms-view.js'
import '../../../ui/pages/import.js'
import '../../../ui/pages/lab.js'
import '../../../ui/pages/nodes/nodes.js'
import '../../../ui/pages/edges/edges.js'

FlowRouter.route( '/topograms', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    "name" : "topograms.index",
    action () {
        BlazeLayout.render("mainLayout", { main: "topograms" });
    }
} )

FlowRouter.route( '/topograms/:topogramId', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  "name" : "topograms.edit",
  action(params) {
    BlazeLayout.render( 'networkLayout', { main : "topogramEdit", "topogramId" : params.topogramId })
  }
} )

/**
* Add ?embed=1 params at the end to remove the home menu and share a clean embed version.
*/
FlowRouter.route( '/topograms/:topogramId/view', {
  "name" : "topograms.view",
  action(params, queryParams) {
    if (queryParams.embed == '1') Session.set('embedView', true)
    BlazeLayout.render( 'networkLayout', { main : "topogramView", "topogramId" : params.topogramId })
  }
} )

FlowRouter.route( '/topograms/:topogramId/lab', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action(params) {
        BlazeLayout.render( 'mainLayout', {
            main: 'lab',
            'topogramId': params.topogramId
        } )
    }
} )

FlowRouter.route( '/topograms/:topogramId/nodes', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action(params) {
        BlazeLayout.render( 'mainLayout', {
            main: 'nodesTemplate',
            'topogramId': params.topogramId
        } )
    }
})

FlowRouter.route( '/topograms/:topogramId/edges', {
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action(params) {
        BlazeLayout.render( 'mainLayout', {
            main: 'edgesTemplate',
            'topogramId': params.topogramId
        } )
    }
})


FlowRouter.route( '/topograms/:topogramId/import', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
      BlazeLayout.render( 'mainLayout', { main : 'import',
                "topogramId": params.topogramId
        } )
    }
} )
