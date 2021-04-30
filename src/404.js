import * as Sentry from '@sentry/react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const PageNotFound = ({ location: { pathname } }) => {
  if (pathname !== '/404') {
    Sentry.captureException(new Error('404 page not found'));
  }

  return (
    <div className="container">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <main>
        <Link to="/">← Home</Link>
        <p>Page not found</p>
      </main>
    </div>
  );
};

export default PageNotFound;

PageNotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
