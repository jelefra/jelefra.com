import React from 'react';

import styles from './feedback.module.scss';

const Feedback = () => (
  <>
    <h2 className={styles.heading}>Send feedback</h2>
    <p>Suggest improvements, report a bug, or just say hi!</p>
    <form
      name="Feedback"
      className={styles.form}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="Feedback" />
      <label htmlFor="feedback">Send feedback</label>
      <textarea id="feedback" name="message" placeholder="Message" required />
      <button className={styles.primary} type="submit">
        Send
      </button>
    </form>
  </>
);

export default Feedback;
