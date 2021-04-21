import { Route, Switch } from 'react-router-dom';
import React from 'react';

import App from './App';
import PageNotFound from './404';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/404" component={PageNotFound} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
