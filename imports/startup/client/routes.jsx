import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from '/imports/client/store';

import MainLayout from '/imports/ui/layouts/MainLayout';
import { HomeContainer } from '/imports/ui/HomeContainer.jsx'


export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomePageContainer}/>
      </Route>
    </Router>
  </Provider>
);
