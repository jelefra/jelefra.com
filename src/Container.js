import PropTypes from 'prop-types';
import React from 'react';

import './container.scss';

const Container = ({ children }) => <div className="container">{children}</div>;

export default Container;

Container.propTypes = {
  children: PropTypes.any,
};
