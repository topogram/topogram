import React, { PropTypes } from 'react';

import '/imports/css/topogram.scss'

import { IntlProvider } from 'react-intl'
import { appLocales, messages } from '../../../i18n.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green500, indigo700, redA200 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// i18n
// import LanguageSwitch from './LanguageSwitch.jsx'

import LoginButtons from '../components/UserMenu.jsx'
import LanguageSwitch from '../components/LanguageSwitch.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color : green500,
    primary2Color : indigo700,
    accent1Color : redA200,
    pickerHeaderColor : green500,
  },
})


const App = ({ children, classNames, locale, messages, user, loadUser, router}) =>
  (
    <IntlProvider locale={locale} messages={messages}>
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className={ classNames }>
            <LoginButtons
              user={user}
              loadUser={loadUser}
              router={router}
              />
            {/* <LanguageSwitch /> */}
            {children}
          </div>
      </MuiThemeProvider>
    </IntlProvider>
  )

App.defaultProps = {
  locale: 'en',
  messages : messages['en']
}

export default App
