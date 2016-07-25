import { FlowRouter } from 'meteor/kadira:flow-router'
import { AccountsTemplates } from 'meteor/useraccounts:core'

import React from 'react'
import {mount} from 'react-mounter'

import mainLayout from '../../../ui/layouts/mainLayout.jsx'

import ImportDataPage from '../../../ui/pages/import.jsx'
import LabPage from '../../../ui/pages/lab.jsx'
import Topograms from '../../../ui/pages/topograms.jsx'

FlowRouter.route( '/topograms/:topogramId/lab', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
    mount(mainLayout, {
      content: (<LabPage topogramId={params.topogramId}/>)
    })
  }
})


FlowRouter.route( '/topograms/:topogramId/import', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
    mount(mainLayout, {
      content: (<ImportDataPage topogramId={params.topogramId}/>)
    })
  }
})


FlowRouter.route( '/topograms', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    mount(mainLayout, {
      content: (<Topograms />)
    })
  }
})

/*
// Import to load these templates and layout

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
*/
