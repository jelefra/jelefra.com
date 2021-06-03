import PropTypes from 'prop-types';
import React from 'react';

import FormattedNote from './FormattedNote';

import getNoteFromFrequency from './utils/getNoteFromFrequency';
import styles from './displayedNote.module.scss';

const DisplayedNote = ({ frequency }) => {
  const noteInfo = getNoteFromFrequency(frequency);

  const { note: fullNote, isExact } = noteInfo;
  const note = fullNote.slice(0, -1);
  const octave = Number(fullNote.slice(-1));

  return (
    <span className={styles.displayedNote}>
      {!isExact && '~'}
      <FormattedNote note={note} octave={octave} />
    </span>
  );
};

export default DisplayedNote;

DisplayedNote.propTypes = {
  frequency: PropTypes.number,
};
