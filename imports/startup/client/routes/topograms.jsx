import { FlowRouter } from 'meteor/kadira:flow-router'
// import { AccountsTemplates } from 'meteor/useraccounts:core'

import React from 'react'
import { mount } from 'react-mounter'

import MainLayout from '../../../client/layouts/MainLayout.jsx'
import FullPageLayout from '../../../client/layouts/FullPageLayout.jsx'

import ImportDataPage from '../../../pages/import.jsx'
import LabPage from '../../../pages/lab.jsx'
import TopogramsPage from '../../../pages/topograms.jsx'
import TopogramPage from '../../../pages/topogram.jsx'

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
