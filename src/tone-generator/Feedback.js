import React from 'react';

import './feedback.scss';

const Feedback = () => (
  <>
    <h2 className="feedback">Send feedback</h2>
    <p>Suggest improvements, report a bug, or just say hi!</p>
    <form
      name="Feedback"
      className="feedback"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="Feedback" />
      <label htmlFor="feedback">Send feedback</label>
      <textarea id="feedback" name="message" placeholder="Message" required />
      <button className="primary" type="submit">
        Send
      </button>
    </form>
  </>
);

export default Feedback;
