import React from 'react'
import LayoutWrapper from './LayoutWrapper.jsx'
import '../css/topogram.scss'

const MainLayout = ({ content }) =>
  (
      <LayoutWrapper
        content={ content }
        classNames="main-view container"
      />
  )

export default MainLayout
