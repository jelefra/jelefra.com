import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter as Router } from 'react-router-dom';
import { StaticRouter } from 'react-router';

import './styles.css';
import Root from './Root';
import Routes from './Routes';

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const Entry = (locals) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={locals.path}>
      <Root>
        <Routes />
      </Root>
    </StaticRouter>
  );
  return '<!DOCTYPE html>' + html;
};

export default Entry;
