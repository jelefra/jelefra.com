import React, { useState } from 'react';
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import ModalBalance from './modals/ModalBalance';
import ModalGain from './modals/ModalGain';
import ModalWaveform from './modals/ModalWaveform';
import Notes from './Notes';
import styles from './widgetUICompact.module.scss';

const WidgetUICompact = ({
  minFrequency,
  maxFrequency,
  frequency,
  gain,
  pan,
  waveform,
  oscillatorNode,
  modalVisibility,
  togglePlay,
  handleChangeFrequency,
  handleChangeGain,
  handleChangeStereoPanner,
  handleChangeWaveform,
  handleModalVisibility,
  handleChangeNote,
}) => {
  const [gainModalVisibility, setGainModalVisibility] = useState(false);
  const [balanceModalVisibility, setBalanceModalVisibility] = useState(false);
  const [waveModalVisibility, setWaveModalVisibility] = useState(false);

  const handleGainModalVisibility = () => {
    setGainModalVisibility(!gainModalVisibility);
  };

  const handleBalanceModalVisibility = () => {
    setBalanceModalVisibility(!balanceModalVisibility);
  };

  const handleWaveModalVisibility = () => {
    setWaveModalVisibility(!waveModalVisibility);
  };

  return (
    <div className={styles.widget}>
      <div className={styles.frequency}>
        <div className={styles.frequencyNumber}>
          <label htmlFor="frequencyNumberInput">Frequency in hertz</label>
          <input
            id="frequencyNumberInput"
            className={styles.frequencyNumberInput}
            type="number"
            min={minFrequency}
            max={maxFrequency}
            value={frequency}
            step="1"
            onChange={handleChangeFrequency}
          />
          <span> Hz</span>
        </div>
        <div className={styles.frequencyRange}>
          <label htmlFor="frequencyRangeInput">Change frequency</label>
          <input
            id="frequencyRangeInput"
            className={styles.frequencyRangeInput}
            type="range"
            min={minFrequency}
            max={maxFrequency}
            value={frequency}
            step="1"
            onChange={handleChangeFrequency}
          />
        </div>
      </div>
      <button
        aria-label={oscillatorNode ? 'Stop' : 'Play'}
        onClick={togglePlay}
        className={styles.play}
      >
        <FontAwesomeIcon
          icon={oscillatorNode ? faStopCircle : faPlayCircle}
          size="3x"
        />
      </button>
      <div className={styles.settings}>
        <button
          className={styles.button}
          aria-label="Set volume"
          onClick={handleGainModalVisibility}
        >
          Volume
        </button>
        <Modal
          show={gainModalVisibility}
          handleClose={handleGainModalVisibility}
        >
          <ModalGain gain={gain} handleChangeGain={handleChangeGain} />
        </Modal>

        <button
          className={styles.button}
          aria-label="Set balance"
          onClick={handleBalanceModalVisibility}
        >
          Balance
        </button>
        <Modal
          show={balanceModalVisibility}
          handleClose={handleBalanceModalVisibility}
        >
          <ModalBalance
            pan={pan}
            handleChangeStereoPanner={handleChangeStereoPanner}
          />
        </Modal>

        <button
          className={styles.button}
          aria-label="Set waveform"
          onClick={handleWaveModalVisibility}
        >
          Wave
        </button>
        <Modal
          show={waveModalVisibility}
          handleClose={handleWaveModalVisibility}
        >
          <ModalWaveform
            waveform={waveform}
            handleChangeWaveform={handleChangeWaveform}
          />
        </Modal>

        <button
          className={styles.button}
          aria-label="Set note frequency"
          onClick={handleModalVisibility}
        >
          Note
        </button>
        <Modal show={modalVisibility} handleClose={handleModalVisibility}>
          <Notes handleChangeNote={handleChangeNote} />
        </Modal>
      </div>
    </div>
  );
};

export default WidgetUICompact;

WidgetUICompact.propTypes = {
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
  handleChangeGain: PropTypes.func,
  handleChangeStereoPanner: PropTypes.func,
  handleChangeWaveform: PropTypes.func,
  handleModalVisibility: PropTypes.func,
  handleChangeNote: PropTypes.func,
};
