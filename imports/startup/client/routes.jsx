import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from '/imports/client/store';

import MainLayout from '/imports/ui/layouts/MainLayout';
import { HomeContainer } from '/imports/ui/containers/HomeContainer.jsx'
import { TopogramContainer } from '/imports/ui/containers/TopogramContainer.jsx'
import Page404 from '/imports/ui/pages/Page404.jsx'


export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomeContainer}/>
        <Route path="topograms/:topogramsId" component={TopogramContainer}/>
        <Route path="*" component={Page404}/>
      </Route>
    </Router>
  </Provider>
);
