import React from 'react';

import './feedback.scss';

const Feedback = () => (
  <>
    <h2
      style={{
        marginTop: '4rem',
      }}
    >
      Send feedback
    </h2>
    <p>Suggest improvements, report a bug, or just say hi!</p>
    <form
      name="Feedback"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="Feedback" />
      <label htmlFor="feedback">Send feedback</label>
      <textarea id="feedback" name="message" placeholder="Message" required />
      <button type="submit">Send</button>
    </form>
  </>
);

export default Feedback;
