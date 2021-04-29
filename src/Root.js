import PropTypes from 'prop-types';
import React from 'react';

const Root = ({ locals, children }) => {
  const { path } = locals;
  const title = locals[path].title;
  const description = locals[path].description;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title || 'Another experiment'}</title>
        {description && <meta name="description" content={description} />}
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div id="root">{children}</div>
        <script src="/main.js" />
      </body>
    </html>
  );
};

export default Root;

Root.propTypes = {
  locals: PropTypes.shape({
    path: PropTypes.string,
  }),
  children: PropTypes.any,
};
