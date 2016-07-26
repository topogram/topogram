import { FlowRouter } from 'meteor/kadira:flow-router'
// import { AccountsTemplates } from 'meteor/useraccounts:core'

import React from 'react'
import { mount } from 'react-mounter'

import MainLayout from '../../../ui/layouts/MainLayout.jsx'
import FullPageLayout from '../../../ui/layouts/FullPageLayout.jsx'

import ImportDataPage from '../../../ui/pages/import.jsx'
import LabPage from '../../../ui/pages/lab.jsx'
import TopogramsPage from '../../../ui/pages/topograms.jsx'
import TopogramPage from '../../../ui/pages/topogram.jsx'

FlowRouter.route( '/topograms/:topogramId/lab', {
  // triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
    mount(MainLayout, {
      content: (<LabPage topogramId={params.topogramId}/>)
    })
  }
})


FlowRouter.route( '/topograms/:topogramId/import', {
  // triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
    mount(MainLayout, {
      content: (<ImportDataPage topogramId={params.topogramId}/>)
    })
  }
})


FlowRouter.route( '/topograms', {
  // triggersEnter: [AccountsTemplates.ensureSignedIn],
  action() {
    mount(MainLayout, {
      content: (<TopogramsPage />)
    })
  }
})

FlowRouter.route( '/topograms/:topogramId', {
  // triggersEnter: [AccountsTemplates.ensureSignedIn],
  action(params) {
    mount(FullPageLayout, {
      content: (<TopogramPage topogramId={params.topogramId} />)
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
