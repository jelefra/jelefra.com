import PropTypes from 'prop-types';
import React from 'react';

import FormattedNote from './FormattedNote';

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
        <div key={octave} className="octave">
          {notes.map((note, index) => (
            <button
              key={note}
              onClick={() => handleChangeNote(`${note}${octave}`)}
              className={note.includes('#') ? 'note sharp' : 'note'}
              style={{
                margin: `0.2em 0.2em ${index > 6 ? 0.7 : 0.2}em`,
              }}
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
