import React from 'react';

import App from './App';

const Root = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Jeremy Le François</title>
      <meta
        name="description"
        content="Hi, I'm Jeremy Le François, a software engineer based in London. This is where I experiment with all things web development."
      />
      <link rel="stylesheet" href="main.css" />
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
