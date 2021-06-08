import {
  faCaretLeft,
  faCaretRight,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';

import DisplayedNote from './DisplayedNote';
import Modal from '../Modal';
import Notes from './Notes';
import styles from './widgetUI.module.scss';

const formatGain = (gain) => `${Math.trunc(100 * gain)}%`;
const displayBalance = (pan) => `${Math.trunc(100 * (1 - Number(pan)))}%`;

const WidgetUI = ({
  minFrequency,
  maxFrequency,
  frequency,
  gain,
  pan,
  waveform,
  oscillatorNode,
  modalVisibility,
  togglePlay,
  handleChangeIncrementFrequency,
  handleChangeFrequency,
  handleChangeGain,
  handleChangeStereoPanner,
  handleChangeWaveform,
  handleModalVisibility,
  handleChangeNote,
}) => (
  <div className={styles.widget}>
    <button aria-label={oscillatorNode ? 'Stop' : 'Play'} onClick={togglePlay}>
      <FontAwesomeIcon
        icon={oscillatorNode ? faStopCircle : faPlayCircle}
        size="3x"
      />
    </button>
    <div className={styles.frequency}>
      <div>
        <button
          aria-label="Decrement frequency by 1"
          onClick={() => handleChangeIncrementFrequency(-1)}
        >
          <FontAwesomeIcon icon={faCaretLeft} size="3x" />
        </button>
        <label htmlFor="frequencyNumber">Frequency in hertz</label>
        <input
          id="frequencyNumber"
          className={styles.frequencyNumber}
          type="number"
          min={minFrequency}
          max={maxFrequency}
          value={frequency}
          step="1"
          onChange={handleChangeFrequency}
        />
        <span> Hz</span>
        <button
          aria-label="Increment frequency by 1"
          onClick={() => handleChangeIncrementFrequency(1)}
        >
          <FontAwesomeIcon icon={faCaretRight} size="3x" />
        </button>
      </div>
      <label htmlFor="frequencyRange">Change frequency</label>
      <input
        id="frequencyRange"
        className={styles.frequencyRange}
        type="range"
        min={minFrequency}
        max={maxFrequency}
        value={frequency}
        step="1"
        onChange={handleChangeFrequency}
      />
    </div>
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
    <div className={styles.balance}>
      <span>
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
      <span>
        R<span>{pan >= 0 ? '100%' : displayBalance(-pan)}</span>
      </span>
    </div>
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
    <button
      className={styles.selectNote}
      aria-label="Set note frequency"
      onClick={handleModalVisibility}
    >
      <FontAwesomeIcon
        icon={faItunesNote}
        size="lg"
        className={styles.noteIcon}
      />
      <DisplayedNote frequency={frequency} />
    </button>
    <Modal show={modalVisibility} handleClose={handleModalVisibility}>
      <Notes handleChangeNote={handleChangeNote} />
    </Modal>
  </div>
);

export default WidgetUI;

WidgetUI.propTypes = {
  minFrequency: PropTypes.number,
  maxFrequency: PropTypes.number,
  frequency: PropTypes.number,
  gain: PropTypes.number,
  pan: PropTypes.number,
  waveform: PropTypes.string,
  oscillatorNode: PropTypes.any,
  modalVisibility: PropTypes.bool,
  togglePlay: PropTypes.func,
  handleChangeFrequency: PropTypes.func,
  handleChangeIncrementFrequency: PropTypes.func,
  handleChangeGain: PropTypes.func,
  handleChangeStereoPanner: PropTypes.func,
  handleChangeWaveform: PropTypes.func,
  handleModalVisibility: PropTypes.func,
  handleChangeNote: PropTypes.func,
};
