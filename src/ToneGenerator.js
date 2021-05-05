import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ToneGenerator = () => {
  const [oscillator, setOscillator] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    return function cleanup() {
      stopTone();
    };
  });

  const initialiseAudioContext = () =>
    !audioContext && setAudioContext(new window.AudioContext());

  const playTone = () => {
    if (audioContext && !oscillator) {
      const oscillatorNode = audioContext.createOscillator();
      oscillatorNode.frequency.value = 440;
      oscillatorNode.connect(audioContext.destination);
      oscillatorNode.start();

      setOscillator(oscillatorNode);
    }
  };

  const stopTone = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
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
          <button onClick={initialiseAudioContext}>Initialise</button>
          <button onClick={playTone}>Play</button>
          <button onClick={stopTone}>Stop</button>
        </div>
      </main>
    </div>
  );
};

export default ToneGenerator;
