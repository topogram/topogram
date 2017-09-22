import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from '/imports/client/store';

import MainLayout from '/imports/client/ui/layouts/MainLayout';
import { HomeContainer } from '/imports/client/ui/containers/HomeContainer.jsx'
// import { TopogramContainer } from '/imports/client/ui/containers/TopogramContainer.jsx'
import { TopogramViewContainer } from '/imports/client/ui/containers/TopogramViewContainer.jsx'
import Page404 from '/imports/client/ui/pages/Page404.jsx'

export const renderRoutes = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={HomeContainer}/>
        {/* <Route path="topograms/:topogramId/edit" component={TopogramContainer}/> */}
        <Route path="topograms/:topogramId" component={TopogramViewContainer}/>
        <Route path="*" component={Page404}/>
      </Route>
    </Router>
  </Provider>
);
