import React, { useEffect, useState } from 'react';
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const formatGain = (number) => `${Math.trunc(100 * number)}%`;

const ToneGenerator = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [gain, setGain] = useState(1);
  const [stereoPannerNode, setStereoPannerNode] = useState(null);
  const [pan, setPan] = useState(0);
  const [oscillatorNode, setOscillatorNode] = useState(null);
  const [frequency, setFrequency] = useState(440);
  const [waveform, setWaveform] = useState('sine');

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
      oscillatorNode.frequency.value = frequency;
    }
    setFrequency(Number(event.target.value));
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
    const gain = gainNode || createGainNode(audioCtx);
    const stereoPanner = stereoPannerNode || createStereoPannerNode(audioCtx);

    if (!oscillatorNode) {
      const oscillatorNode = audioCtx.createOscillator();
      oscillatorNode.frequency.value = frequency;
      oscillatorNode.type = waveform;
      oscillatorNode
        .connect(gain)
        .connect(stereoPanner)
        .connect(audioCtx.destination);
      oscillatorNode.start();

      setOscillatorNode(oscillatorNode);
    }
  };

  const stopTone = () => {
    if (oscillatorNode) {
      oscillatorNode.stop();
      setOscillatorNode(null);
    }
  };

  return (
    <div className="container">
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
          <FontAwesomeIcon
            onClick={togglePlay}
            icon={oscillatorNode ? faStopCircle : faPlayCircle}
            size="3x"
            style={{ display: 'block', margin: '0 auto' }}
          />
          <div style={{ margin: '1.5em auto' }}>
            <label htmlFor="frequency">Change frequency</label>
            <input
              id="frequency"
              type="range"
              min="1"
              max="5000"
              value={frequency}
              step="1"
              onChange={handleChangeFrequency}
              style={{ display: 'block', margin: '0 auto', width: '300px' }}
            />
            <span
              style={{
                display: 'block',
                textAlign: 'center',
                margin: '0.3em auto 1.5em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {frequency} Hz
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 175px 1fr',
              alignItems: 'center',
              margin: '1em 0',
            }}
          >
            <FontAwesomeIcon
              icon={faVolumeUp}
              style={{ gridColumn: '1 / span 1', justifySelf: 'end' }}
            />
            <label htmlFor="gain">Change volume</label>
            <input
              id="gain"
              type="range"
              min="0"
              max="2"
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
              margin: '1em 0',
            }}
          >
            <span style={{ gridColumn: '1 / span 1', justifySelf: 'end' }}>
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
            </span>
          </div>
          <div
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
        </div>
      </main>
    </div>
  );
};

export default ToneGenerator;
