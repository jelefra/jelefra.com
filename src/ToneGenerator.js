import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ToneGenerator = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [oscillatorNode, setOscillatorNode] = useState(null);

  const defaultGainValue = 1;

  useEffect(() => {
    return function cleanup() {
      stopTone();
    };
  });

  const initialiseAudioContext = () =>
    !audioContext && setAudioContext(new window.AudioContext());

  const createGainNode = () => {
    if (audioContext && !gainNode) {
      const gainNode = audioContext.createGain();
      gainNode.gain.value = defaultGainValue;

      setGainNode(gainNode);
    }
  };

  const handleChange = (event) => {
    if (gainNode) {
      gainNode.gain.value = Number(event.target.value);
    }
  };

  const playTone = () => {
    if (gainNode && !oscillatorNode) {
      const oscillatorNode = audioContext.createOscillator();
      oscillatorNode.frequency.value = 440;
      oscillatorNode.connect(gainNode).connect(audioContext.destination);
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
          <button onClick={initialiseAudioContext}>
            Initialise audio context
          </button>
          <button onClick={createGainNode}>Create gain node</button>
          <button onClick={playTone}>Play</button>
          <button onClick={stopTone}>Stop</button>
          <input
            type="range"
            min="0"
            max="2"
            defaultValue={defaultGainValue}
            step="0.02"
            onChange={handleChange}
          />
        </div>
      </main>
    </div>
  );
};

export default ToneGenerator;
