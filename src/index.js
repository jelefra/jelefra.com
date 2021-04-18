import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import App from './App';
import Root from './Root';

if (typeof document !== 'undefined') {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const Entry = () => {
  const html = ReactDOMServer.renderToString(React.createElement(Root));
  return '<!DOCTYPE html>' + html;
};

export default Entry;
