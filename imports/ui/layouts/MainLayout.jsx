import React from 'react'
import LayoutWrapper from './LayoutWrapper.jsx'
import '../css/topogram.scss'

const MainLayout = ({ children }) => (
    <LayoutWrapper
      content={ children }
      classNames="main-view container"
    />
  )

export default MainLayout
