import PropTypes from 'prop-types';
import React from 'react';

import FormattedNote from './FormattedNote';
import styles from './notes.module.scss';

const Notes = ({ handleChangeNote }) => {
  const octaves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  return (
    <div>
      {octaves.map((octave) => (
        <div key={octave} className={styles.octave}>
          {notes.map((note, index) => (
            <button
              key={note}
              onClick={() => handleChangeNote(`${note}${octave}`)}
              className={`${styles.note} ${
                note.includes('#') ? styles.sharp : ''
              } ${index > 6 ? styles.wrapped : ''}`}
            >
              <FormattedNote note={note} octave={octave} />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Notes;

Notes.propTypes = {
  handleChangeNote: PropTypes.func,
};
