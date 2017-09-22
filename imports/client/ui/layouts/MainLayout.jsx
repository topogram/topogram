import React from 'react'
import LayoutWrapper from '/imports/client/ui/layouts/LayoutWrapper.jsx'
import '/imports/css/topogram.scss'

const MainLayout = ({ children }) => (
    <LayoutWrapper
      content={ children }
      classNames="main-view container"
    />
  )

export default MainLayout
