import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ToneGenerator = () => {
  let playTone;
  let stopTone;

  if (typeof document !== 'undefined') {
    const [oscillator, setOscillator] = useState(null);

    playTone = () => {
      if (!oscillator) {
        const audioContext = new window.AudioContext();
        const oscillatorNode = audioContext.createOscillator();
        oscillatorNode.frequency.value = 440;
        oscillatorNode.connect(audioContext.destination);
        oscillatorNode.start();

        setOscillator(oscillatorNode);
      }
    };

    stopTone = () => {
      if (oscillator) {
        oscillator.stop();
        setOscillator(null);
      }
    };
  }

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
          <button onClick={playTone}>Play</button>
          <button onClick={stopTone}>Stop</button>
        </div>
      </main>
    </div>
  );
};

export default ToneGenerator;
