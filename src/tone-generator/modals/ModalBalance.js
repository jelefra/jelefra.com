import PropTypes from 'prop-types';
import React from 'react';

import styles from './modalBalance.module.scss';

const displayBalance = (pan) => `${Math.trunc(100 * (1 - Number(pan)))}%`;

const ModalBalance = ({ handleChangeStereoPanner, pan }) => {
  return (
    <div className={styles.balance}>
      <span className={styles.left}>
        <span>{pan <= 0 ? '100%' : displayBalance(pan)}</span>L
      </span>
      <label htmlFor="balanceRange">Change balance</label>
      <input
        id="balanceRange"
        className={styles.balanceRange}
        type="range"
        min="-1"
        max="1"
        value={pan}
        step="0.01"
        onChange={handleChangeStereoPanner}
      />
      <span className={styles.right}>
        R<span>{pan >= 0 ? '100%' : displayBalance(-pan)}</span>
      </span>
    </div>
  );
};

export default ModalBalance;

ModalBalance.propTypes = {
  handleChangeStereoPanner: PropTypes.func,
  pan: PropTypes.number,
};
