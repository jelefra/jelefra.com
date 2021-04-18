import React from 'react';

import App from './App';

const Root = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Jeremy Le François - Web developer in London</title>
      <meta
        name="description"
        content="Personal website of Jeremy Le François. Where I experiment with all things web development."
      />
    </head>
    <body>
      <div id="root">
        <App />
      </div>
      <script src="main.js" />
    </body>
  </html>
);

export default Root;
