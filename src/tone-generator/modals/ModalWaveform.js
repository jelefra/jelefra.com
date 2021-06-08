import PropTypes from 'prop-types';
import React from 'react';

import styles from './modalWaveform.module.scss';

const ModalWaveform = ({ waveform, handleChangeWaveform }) => {
  return (
    <div className={styles.waveform}>
      <button
        onClick={() => handleChangeWaveform('sine')}
        className={`${styles.waveformButton} ${
          waveform === 'sine' ? styles.active : ''
        }`}
      >
        Sine
      </button>
      <button
        onClick={() => handleChangeWaveform('square')}
        className={`${styles.waveformButton} ${
          waveform === 'square' ? styles.active : ''
        }`}
      >
        Square
      </button>
      <button
        onClick={() => handleChangeWaveform('triangle')}
        className={`${styles.waveformButton} ${
          waveform === 'triangle' ? styles.active : ''
        }`}
      >
        Triangle
      </button>
      <button
        onClick={() => handleChangeWaveform('sawtooth')}
        className={`${styles.waveformButton} ${
          waveform === 'sawtooth' ? styles.active : ''
        }`}
      >
        Sawtooth
      </button>
    </div>
  );
};

export default ModalWaveform;

ModalWaveform.propTypes = {
  waveform: PropTypes.string,
  handleChangeWaveform: PropTypes.func,
};
