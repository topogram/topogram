import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'

import '../css/topogram.scss'

const mainLayout = ({content}) =>
  (
    <MuiThemeProvider>
      <div className="main-view container">
        {content}
      </div>
    </MuiThemeProvider>
  )

export default mainLayout
