import React from 'react'

import LayoutWrapper from './LayoutWrapper.jsx'
import '../css/topogram.scss'

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const MainLayout = ({ content }) =>
  (
    <LayoutWrapper
      content={ content }
      classNames="main-view container"
    />
  )

export default MainLayout
