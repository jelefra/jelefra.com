import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter as Router } from 'react-router-dom';
import { StaticRouter } from 'react-router';

import './styles.scss';
import App from './App';
import Root from './Root';

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const Entry = (locals) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={locals.path} context={{}}>
      <Root>
        <App />
      </Root>
    </StaticRouter>
  );
  return '<!DOCTYPE html>' + html;
};

export default Entry;
