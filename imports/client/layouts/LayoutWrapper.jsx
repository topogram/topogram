import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green500, indigo700, redA200 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// i18n
import LanguageSwitch from './LanguageSwitch.jsx'

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color : green500,
    primary2Color : indigo700,
    accent1Color : redA200,
    pickerHeaderColor : green500,
  },
})

const LayoutWrapper = ({ content , classNames}) =>
  (
    <MuiThemeProvider muiTheme={muiTheme}>
      <LanguageSwitch>
        <div className={ classNames }>
          {content}
        </div>
      </LanguageSwitch>
    </MuiThemeProvider>
  )

export default LayoutWrapper
