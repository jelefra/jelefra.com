import * as Sentry from '@sentry/react';
import { Helmet } from 'react-helmet';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter as Router } from 'react-router-dom';
import { StaticRouter } from 'react-router';

import './styles.scss';
import App from './App';
import { html } from './html';

if (typeof document !== 'undefined') {
  if (window.location.href.includes('jelefra.com')) {
    Sentry.init({
      dsn:
        'https://e13cff519b39458fbd9bc4774a5c4bea@o590811.ingest.sentry.io/5740208',
    });
  }

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
  const reactDom = ReactDOMServer.renderToString(
    <StaticRouter location={locals.path} context={{}}>
      <App />
    </StaticRouter>
  );
  const helmetData = Helmet.renderStatic();
  return html(reactDom, helmetData);
};

export default Entry;
