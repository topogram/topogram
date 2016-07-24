import { Router } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'
import { AccountsTemplates } from 'meteor/useraccounts:core'


import React from 'react';
import {mount} from 'react-mounter';

import mainLayout from '../../../ui/layouts/mainLayout.jsx'
import ImportDataPage from '../../../ui/pages/import.jsx'


// Import to load these templates and layout
import '../../../ui/layouts/mainLayout.js'
import '../../../ui/layouts/networkLayout.js'
import '../../../ui/pages/topograms/topograms-edit.js'
import '../../../ui/pages/topograms/topograms-index.js'
import '../../../ui/pages/topograms/topograms-view.js'
import '../../../ui/pages/lab.js'

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

FlowRouter.route( '/topograms/:topogramId/view', {
  "name" : "topograms.view",
  action(params) {
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


FlowRouter.route( '/topograms/:topogramId/import', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
    mount(mainLayout, {
        content: (<ImportDataPage topogramId={params.topogramId}/>)
    });



    }
} )
