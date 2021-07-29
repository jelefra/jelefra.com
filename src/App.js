import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Home from './Home';
import HomeServerEvolutionStoneAge from './posts/21-06-18-home-server-evolution-stone-age/HomeServerEvolutionStoneAge';
import PageNotFound from './404';
import ToneGenerator from './tone-generator/ToneGenerator';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/tone-generator/" component={ToneGenerator} />
    <Route
      path="/home-server-evolution-stone-age/"
      component={HomeServerEvolutionStoneAge}
    />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;
