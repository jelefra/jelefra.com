import React, { useEffect, useState } from 'react';
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const ToneGenerator = () => {
  const defaultFrequencyValue = 440;
  const defaultGainValue = 1;
  const defaultPanValue = 0;
  const defaultWaveform = 'sine';

  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [stereoPannerNode, setStereoPannerNode] = useState(null);
  const [oscillatorNode, setOscillatorNode] = useState(null);
  const [frequency, setFrequency] = useState(defaultFrequencyValue);
  const [waveform, setWaveform] = useState(defaultWaveform);

  useEffect(() => {
    return function cleanup() {
      stopTone();
    };
  }, [oscillatorNode]);

  const handleChangeGain = (event) => {
    if (gainNode) {
      gainNode.gain.value = Number(event.target.value);
    }
  };

  const handleChangeStereoPanner = (event) => {
    if (stereoPannerNode) {
      stereoPannerNode.pan.value = Number(event.target.value);
    }
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
    gainNode.gain.value = defaultGainValue;
    setGainNode(gainNode);
    return gainNode;
  };

  const createStereoPannerNode = (audioContext) => {
    const stereoPannerNode = audioContext.createStereoPanner();
    stereoPannerNode.pan.value = defaultPanValue;

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
        <div className="tone-generator">
          <FontAwesomeIcon
            onClick={togglePlay}
            icon={oscillatorNode ? faStopCircle : faPlayCircle}
            size="3x"
          />
          <label htmlFor="frequency">Change frequency</label>
          <input
            id="frequency"
            type="range"
            min="1"
            max="5000"
            value={frequency}
            step="1"
            onChange={handleChangeFrequency}
          />
          <FontAwesomeIcon icon={faVolumeUp} />
          <label htmlFor="gain">Change volume</label>
          <input
            id="gain"
            type="range"
            min="0"
            max="2"
            defaultValue={defaultGainValue}
            step="0.02"
            onChange={handleChangeGain}
          />
          <span>L</span>
          <label htmlFor="balance">Change balance</label>
          <input
            id="balance"
            type="range"
            min="-1"
            max="1"
            defaultValue={defaultPanValue}
            step="0.01"
            onChange={handleChangeStereoPanner}
          />
          <span>R</span>
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
          >
            Sine
          </button>
          <button
            onClick={() => onClickWaveform('square')}
            style={{ margin: '0 0.5em' }}
          >
            Square
          </button>
          <button
            onClick={() => onClickWaveform('triangle')}
            style={{ margin: '0 0.5em' }}
          >
            Triangle
          </button>
          <button
            onClick={() => onClickWaveform('sawtooth')}
            style={{ margin: '0 0.5em' }}
          >
            Sawtooth
          </button>
        </div>
      </main>
    </div>
  );
};

export default ToneGenerator;
