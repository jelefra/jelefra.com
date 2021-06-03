import PropTypes from 'prop-types';
import React from 'react';

import styles from './container.module.scss';

const Container = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Container;

Container.propTypes = {
  children: PropTypes.any,
};
