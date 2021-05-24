import PropTypes from 'prop-types';
import React from 'react';

const FormattedNote = ({ note, octave }) => {
  return (
    <>
      {note}
      <sub>{octave}</sub>
    </>
  );
};

export default FormattedNote;

FormattedNote.propTypes = {
  note: PropTypes.string,
  octave: PropTypes.number,
};
