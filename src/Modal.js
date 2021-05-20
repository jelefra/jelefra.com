import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={show ? 'modal visible' : 'modal'}>
      <section>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            style={{
              padding: '0.5em',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.any,
};
