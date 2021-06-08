import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import styles from './modalGain.module.scss';

const formatGain = (gain) => `${Math.trunc(100 * gain)}%`;

const ModalGain = ({ handleChangeGain, gain }) => {
  return (
    <div className={styles.gain}>
      <FontAwesomeIcon icon={faVolumeUp} className={styles.volumeUp} />
      <label htmlFor="gainRange">Change volume</label>
      <input
        id="gainRange"
        className={styles.gainRange}
        type="range"
        min="0"
        max="1"
        value={gain}
        step="0.01"
        onChange={handleChangeGain}
      />
      <span>{formatGain(gain)}</span>
    </div>
  );
};

export default ModalGain;

ModalGain.propTypes = {
  gain: PropTypes.number,
  handleChangeGain: PropTypes.func,
};
