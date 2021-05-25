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
import Form from './Form';
import Instructions from './Instructions';
import Modal from '../Modal';
import Notes from './Notes';
import Warning from './Warning';

import './toneGenerator.scss';
import frequencies from './utils/frequencies';

const formatGain = (gain) => `${Math.trunc(100 * gain)}%`;
const displayBalance = (pan) => `${Math.trunc(100 * (1 - Number(pan)))}%`;

const ToneGenerator = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [gain, setGain] = useState(0.7);
  const [stereoPannerNode, setStereoPannerNode] = useState(null);
  const [pan, setPan] = useState(0);
  const [oscillatorNode, setOscillatorNode] = useState(null);
  const [frequency, setFrequency] = useState(440);
  const [waveform, setWaveform] = useState('sine');
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
    setGain(event.target.value);
  };

  const handleChangeStereoPanner = (event) => {
    if (stereoPannerNode) {
      stereoPannerNode.pan.value = Number(event.target.value);
    }
    setPan(event.target.value);
  };

  const handleChangeFrequency = (event) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = event.target.value;
    }
    setFrequency(Number(event.target.value));
  };

  const handleChangeNote = (note) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = frequencies[note];
    }
    setFrequency(frequencies[note]);
    handleModalVisibility();
  };

  const handleChangeIncrementFrequency = (increment) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value += increment;
    }
    setFrequency((frequency) => frequency + increment);
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
    setGainNode(gainNode);
    return gainNode;
  };

  const createStereoPannerNode = (audioContext) => {
    const stereoPannerNode = audioContext.createStereoPanner();
    stereoPannerNode.pan.value = pan;
    setStereoPannerNode(stereoPannerNode);
    return stereoPannerNode;
  };

  const onClickWaveform = (value) => {
    if (oscillatorNode) {
      oscillatorNode.type = value;
    }
    setWaveform(value);
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

      setOscillatorNode(oscillatorNode);
    }
  };

  const stopTone = () => {
    if (oscillatorNode) {
      // Decrease gain gradually to prevent clicking sound
      gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.01);
      setOscillatorNode(null);
      setGainNode(null);
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
        <div className="tone-generator" style={{ marginTop: '2rem' }}>
          <h1 style={{ marginBottom: '3rem' }}>Tone generator</h1>
          <div className="widget">
            <button
              aria-label={oscillatorNode ? 'Stop' : 'Play'}
              onClick={togglePlay}
              style={{
                display: 'block',
                border: 'none',
                background: 'transparent',
                margin: '0 auto',
              }}
            >
              <FontAwesomeIcon
                icon={oscillatorNode ? faStopCircle : faPlayCircle}
                size="3x"
              />
            </button>
            <div className="frequency" style={{ margin: '1.5em auto' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '1em',
                }}
              >
                <button
                  aria-label="Decrement frequency by 1"
                  onClick={() => handleChangeIncrementFrequency(-1)}
                >
                  <FontAwesomeIcon icon={faCaretLeft} size="3x" />
                </button>
                <label htmlFor="hertz">Frequency in hertz</label>
                <input
                  type="number"
                  id="hertz"
                  min={minFrequency}
                  max={maxFrequency}
                  value={frequency}
                  step="1"
                  onChange={handleChangeFrequency}
                  style={{
                    border: '1px solid darkgrey',
                    borderRadius: '4px',
                    fontFamily: 'inherit',
                    fontSize: '1.5em',
                    fontVariantNumeric: 'tabular-nums',
                    width: '130px',
                    marginRight: '6px',
                    paddingRight: '4px',
                    textAlign: 'right',
                  }}
                />
                <span> Hz</span>
                <button
                  aria-label="Increment frequency by 1"
                  onClick={() => handleChangeIncrementFrequency(1)}
                >
                  <FontAwesomeIcon icon={faCaretRight} size="3x" />
                </button>
              </div>
              <label htmlFor="frequency">Change frequency</label>
              <input
                id="frequency"
                type="range"
                min={minFrequency}
                max={maxFrequency}
                value={frequency}
                step="1"
                onChange={handleChangeFrequency}
                style={{ display: 'block', margin: '0 auto', width: '300px' }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 175px 1fr',
                alignItems: 'center',
                margin: '1.85em 0 1.5em',
              }}
            >
              <FontAwesomeIcon
                icon={faVolumeUp}
                style={{
                  gridColumn: '1 / span 1',
                  justifySelf: 'end',
                  color: 'dimgrey',
                }}
              />
              <label htmlFor="gain">Change volume</label>
              <input
                id="gain"
                type="range"
                min="0"
                max="1"
                value={gain}
                step="0.01"
                onChange={handleChangeGain}
                style={{ gridColumn: '2 / span 1', margin: '0 10px' }}
              />
              <span
                style={{
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatGain(gain)}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 175px 1fr',
                alignItems: 'center',
                margin: '1.5em 0',
              }}
            >
              <span style={{ gridColumn: '1 / span 1', justifySelf: 'end' }}>
                <span
                  style={{
                    marginRight: '0.3em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pan <= 0 ? '100%' : displayBalance(pan)}
                </span>
                L
              </span>
              <label htmlFor="balance">Change balance</label>
              <input
                id="balance"
                type="range"
                min="-1"
                max="1"
                value={pan}
                step="0.01"
                onChange={handleChangeStereoPanner}
                style={{ gridColumn: '2 / span 1', margin: '0 10px' }}
              />
              <span style={{ gridColumn: '3 / span 1', justifySelf: 'start' }}>
                R
                <span
                  style={{
                    marginLeft: '0.3em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {pan >= 0 ? '100%' : displayBalance(-pan)}
                </span>
              </span>
            </div>
            <div
              className="waveform"
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0.5em 0',
              }}
            >
              <button
                onClick={() => onClickWaveform('sine')}
                style={{ margin: '0 0.5em' }}
                className={waveform === 'sine' ? 'active' : null}
              >
                Sine
              </button>
              <button
                onClick={() => onClickWaveform('square')}
                style={{ margin: '0 0.5em' }}
                className={waveform === 'square' ? 'active' : null}
              >
                Square
              </button>
              <button
                onClick={() => onClickWaveform('triangle')}
                style={{ margin: '0 0.5em' }}
                className={waveform === 'triangle' ? 'active' : null}
              >
                Triangle
              </button>
              <button
                onClick={() => onClickWaveform('sawtooth')}
                className={waveform === 'sawtooth' ? 'active' : null}
                style={{ margin: '0 0.5em' }}
              >
                Sawtooth
              </button>
            </div>
            <button
              className="note-icon"
              aria-label="Set note frequency"
              style={{
                display: 'block',
                margin: '1em auto',
                width: '95px',
                textAlign: 'left',
              }}
              onClick={handleModalVisibility}
            >
              <FontAwesomeIcon
                icon={faItunesNote}
                size="lg"
                style={{ marginLeft: '5px' }}
              />
              <DisplayedNote frequency={frequency} />
            </button>
            <Modal show={modalVisibility} handleClose={handleModalVisibility}>
              <Notes handleChangeNote={handleChangeNote} />
            </Modal>
          </div>
          <Form />
          <Warning />
          <Instructions />
        </div>
      </main>
    </Container>
  );
};

export default ToneGenerator;
