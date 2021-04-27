import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Home from './Home';
import PageNotFound from './404';
import ToneGenerator from './ToneGenerator';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/tone-generator/" component={ToneGenerator} />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;
