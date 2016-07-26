import React from 'react'

import LayoutWrapper from './LayoutWrapper.jsx'
import '../css/topogram.scss'

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const FullPageLayout = ({ content }) =>
  (
    <LayoutWrapper
      content={ content }
      classNames=""
    />
  )

export default FullPageLayout
