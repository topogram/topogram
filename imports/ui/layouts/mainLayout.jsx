import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'


const mainLayout = ({content}) =>
  (
    <MuiThemeProvider>
      <div className="main-view container">
          <div class="row">
              <div className="col s10 offset-s1">
                  {content}
              </div>
          </div>
      </div>
    </MuiThemeProvider>
  )

export default mainLayout
