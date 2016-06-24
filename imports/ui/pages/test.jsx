import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';

const MyAwesomeReactComponent = ({name}) => (
  <RaisedButton label="yoyoy" />
);

// define and export our Layout component
export const Layout = ({content}) => (
    <div>
        <h1>My App</h1>
        <hr />
        <div>{content}</div>
    </div>
);

// define and export our Welcome component
export const Welcome = ({name}) => (
    <div>
      <MuiThemeProvider>
        <MyAwesomeReactComponent label={name}/>
      </MuiThemeProvider>
    </div>
);

//
