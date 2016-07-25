import { FlowRouter } from 'meteor/kadira:flow-router'
import React from 'react'
import {mount} from 'react-mounter'

import mainLayout from '../../../ui/layouts/mainLayout.jsx'
import { Welcome } from '../../../ui/pages/home.jsx'
import NotFoundPage from '../../../ui/components/NotFoundPage.jsx'

//Render homepage with React
FlowRouter.route('/', {
  action() {
    mount(mainLayout, {
      content: (<Welcome name="Welcome to Topogram"/>)
    })
  }
})


//404

FlowRouter.notFound = {
  action() {
    mount(mainLayout, {
      content: (<NotFoundPage />)
    })
  }
}
