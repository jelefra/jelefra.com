import { Link } from 'react-router-dom';
import React from 'react';

const ToneGenerator = () => {
  let playTone;
  let stopTone;

  if (typeof document !== 'undefined') {
    const audioContext = new window.AudioContext();
    let oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 440;
    oscillator.start();

    playTone = () => oscillator.connect(audioContext.destination);
    stopTone = () => oscillator.disconnect(audioContext.destination);
  }

  return (
    <div className="container">
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
