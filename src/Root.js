import PropTypes from 'prop-types';
import React from 'react';

const Root = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Jeremy Le François</title>
      <meta
        name="description"
        content="Hi, I'm Jeremy Le François, a software engineer based in London. This is where I experiment with all things web development."
      />
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script src="/main.js" />
    </body>
  </html>
);

export default Root;

Root.propTypes = {
  children: PropTypes.any,
};
