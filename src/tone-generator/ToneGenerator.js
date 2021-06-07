import React, { useEffect, useState } from 'react';
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
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';

import Container from '.././Container';
import DisplayedNote from './DisplayedNote';
import Feedback from './Feedback';
import Instructions from './Instructions';
import Modal from '../Modal';
import Notes from './Notes';
import Warning from './Warning';

import frequencies from './constants/frequencies';
import styles from './toneGenerator.module.scss';

const formatGain = (gain) => `${Math.trunc(100 * gain)}%`;
const displayBalance = (pan) => `${Math.trunc(100 * (1 - Number(pan)))}%`;

const ToneGenerator = () => {
  const [audioContext, setAudioContext] = useState(null);

  const [tone, setTone] = useState({
    frequency: 440,
    gain: 0.7,
    gainNode: undefined,
    pan: 0,
    stereoPannerNode: undefined,
    waveform: 'sine',
    oscillatorNode: undefined,
  });

  const {
    frequency,
    gain,
    gainNode,
    pan,
    stereoPannerNode,
    waveform,
    oscillatorNode,
  } = tone;

  const [modalVisibility, setModalVisibility] = useState(false);

  const minFrequency = 1;
  const maxFrequency = 5000;

  useEffect(() => {
    return function cleanup() {
      stopTone();
    };
  }, [oscillatorNode]);

  const handleChangeGain = (event) => {
    if (gainNode) {
      gainNode.gain.value = Number(event.target.value);
    }
    setTone({
      ...tone,
      gain: event.target.value,
    });
  };

  const handleChangeStereoPanner = (event) => {
    if (stereoPannerNode) {
      stereoPannerNode.pan.value = Number(event.target.value);
    }
    setTone({ ...tone, pan: event.target.value });
  };

  const handleChangeFrequency = (event) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = event.target.value;
    }
    setTone({
      ...tone,
      frequency: Number(event.target.value),
    });
  };

  const handleChangeNote = (note) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = frequencies[note];
    }
    setTone({
      ...tone,
      frequency: frequencies[note],
    });
    handleModalVisibility();
  };

  const handleChangeIncrementFrequency = (increment) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value += increment;
    }
    setTone({
      ...tone,
      frequency: frequency + increment,
    });
  };

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const initialiseAudioContext = () => {
    const audioContext = new window.AudioContext();
    setAudioContext(audioContext);
    return audioContext;
  };

  const createGainNode = (audioContext) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = gain;
    setTone((prevState) => ({ ...prevState, gainNode: gainNode }));
    return gainNode;
  };

  const createStereoPannerNode = (audioContext) => {
    const stereoPannerNode = audioContext.createStereoPanner();
    stereoPannerNode.pan.value = pan;
    setTone((prevState) => ({
      ...prevState,
      stereoPannerNode: stereoPannerNode,
    }));
    return stereoPannerNode;
  };

  const onClickWaveform = (value) => {
    if (oscillatorNode) {
      oscillatorNode.type = value;
    }
    setTone({ ...tone, waveform: value });
  };

  const togglePlay = () => (oscillatorNode ? stopTone() : playTone());

  const playTone = () => {
    const audioCtx = audioContext || initialiseAudioContext();
    const gainNodeInstance = gainNode || createGainNode(audioCtx);
    const stereoPanner = stereoPannerNode || createStereoPannerNode(audioCtx);

    if (!oscillatorNode) {
      const oscillatorNode = audioCtx.createOscillator();
      oscillatorNode.frequency.value = frequency;
      oscillatorNode.type = waveform;
      oscillatorNode
        .connect(gainNodeInstance)
        .connect(stereoPanner)
        .connect(audioCtx.destination);

      // Increase gain gradually to prevent clicking sound
      gainNodeInstance.gain.value = 0;
      oscillatorNode.start();
      gainNodeInstance.gain.setTargetAtTime(gain, audioCtx.currentTime, 0.3);

      setTone((prevState) => ({
        ...prevState,
        oscillatorNode: oscillatorNode,
      }));
    }
  };

  const stopTone = () => {
    if (oscillatorNode) {
      // Decrease gain gradually to prevent clicking sound
      gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.01);
      setTone((prevState) => ({
        ...prevState,
        oscillatorNode: null,
        gainNode: null,
      }));
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Tone Generator</title>
        <meta
          name="description"
          content="Generate pure tones of any frequency directly in your browser. Combine
          up to 5 tones and choose from sine, square, sawtooth, or triangle."
        />
      </Helmet>
      <main>
        <Link to="/">← Home</Link>
        <div className={styles.toneGenerator}>
          <h1>Tone generator</h1>
          <div className={styles.widget}>
            <button
              aria-label={oscillatorNode ? 'Stop' : 'Play'}
              onClick={togglePlay}
            >
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
                onClick={() => onClickWaveform('sine')}
                className={`${styles.waveformButton} ${
                  waveform === 'sine' ? styles.active : ''
                }`}
              >
                Sine
              </button>
              <button
                onClick={() => onClickWaveform('square')}
                className={`${styles.waveformButton} ${
                  waveform === 'square' ? styles.active : ''
                }`}
              >
                Square
              </button>
              <button
                onClick={() => onClickWaveform('triangle')}
                className={`${styles.waveformButton} ${
                  waveform === 'triangle' ? styles.active : ''
                }`}
              >
                Triangle
              </button>
              <button
                onClick={() => onClickWaveform('sawtooth')}
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
          <Feedback />
          <Warning />
          <Instructions />
        </div>
      </main>
    </Container>
  );
};

export default ToneGenerator;
