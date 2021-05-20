import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import {
  faPlayCircle,
  faStopCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';

const Instructions = () => (
  <>
    <h2>How to use the frequency generator</h2>
    <ul>
      <li>
        Press <FontAwesomeIcon icon={faPlayCircle} /> to play a tone.
      </li>
      <li>
        Press <FontAwesomeIcon icon={faStopCircle} /> to stop it.
      </li>
      <li>
        Change the frequency one of four ways:
        <ul>
          <li>Enter the value in the input field</li>
          <li>
            Press <FontAwesomeIcon icon={faCaretLeft} /> to decrease by 1 Hz
          </li>
          <li>
            Press <FontAwesomeIcon icon={faCaretRight} /> to increase by 1 Hz
          </li>
          <li>Move the frequency slider</li>
        </ul>
      </li>
      <li>Move the volume slider to control the volume.</li>
      <li>
        Move the balance slider to control the stereo panning. When balance is
        set to &quot;100% L R 100%&quot;, sound will be equally distributed
        between the left (L) and right (R) channels.
      </li>
      <li>
        Select from &apos;Sine&apos;, &apos;Square&apos;, &apos;Triangle&apos;,
        and &apos;Sawtooth&apos; to change the waveform.
      </li>
      <li>
        Press <FontAwesomeIcon icon={faItunesNote} /> to set the frequency to a
        given note between C<sub>0</sub> and B<sub>8</sub>. Frequencies assume A
        <sub>4</sub> = 440 Hz.
      </li>
    </ul>
  </>
);

export default Instructions;
