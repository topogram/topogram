import { FlowRouter } from 'meteor/kadira:flow-router'
import React from 'react'
import { mount } from 'react-mounter'

import MainLayout from '../../../client/layouts/MainLayout.jsx'
import NotFoundPage from '../../../client/components/NotFoundPage.jsx'

import Welcome from '../../../pages/home.jsx'

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Welcome name="Welcome to Topogram"/>)
    })
  }
})


//404
FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: (<NotFoundPage />)
    })
  }
}
