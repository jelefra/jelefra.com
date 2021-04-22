import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Home from './Home';
import PageNotFound from './404';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;
