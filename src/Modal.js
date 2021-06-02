import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './modal.scss';

const Modal = ({ handleClose, show, children }) => {
  return (
    <div className={show ? 'modal visible' : 'modal'}>
      <section>
        <div>
          <button type="button" onClick={handleClose} aria-label="Close">
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
