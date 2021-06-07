import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Container from '.././Container';
import Feedback from './Feedback';
import Instructions from './Instructions';
import Warning from './Warning';
import Widget from './widget';

import styles from './toneGenerator.module.scss';

const ToneGenerator = () => {
  const [widgetsCount, setWidgetsCount] = useState(1);

  const handleAddWidget = () => {
    setWidgetsCount((widgetCount) => widgetCount + 1);
  };

  return (
    <Container>
      <Helmet>
        <title>Tone Generator</title>
        <meta
          name="description"
          content="Generate pure tones of any frequency directly in your browser. Combine
          up to 5 tones and choose from sine, square, sawtooth, or triangle."
        />
      </Helmet>
      <main>
        <Link to="/">← Home</Link>
        <div className={styles.toneGenerator}>
          <h1>Tone generator</h1>
          {[...Array(widgetsCount)].map((_, index) => (
            <Widget key={index} />
          ))}
          <button onClick={handleAddWidget} className={styles.buttonSecondary}>
            Add a tone
          </button>
          <Feedback />
          <Warning />
          <Instructions />
        </div>
      </main>
    </Container>
  );
};

export default ToneGenerator;
