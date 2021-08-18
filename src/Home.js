import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';

import Container from './Container';
import styles from './home.module.scss';

const Home = () => (
  <Container>
    <Helmet>
      <title>Jeremy Le François</title>
      <meta
        name="description"
        content="Hi, I'm Jeremy Le François, a software engineer based in London.
        This is where I experiment with all things web development."
      />
    </Helmet>
    <main>
      <p>Hi, my name is</p>
      <h1 className={styles.title}>Jeremy Le François.</h1>
      <p>I&apos;m a software engineer based in London.</p>
      <p>
        Currently I work at Trainline on delivering fast web pages that are
        optimised for search engines and useful for humans.
      </p>
      <h2>Projects</h2>
      <ul>
        <li>
          <Link to="/tone-generator/">Tone generator</Link>
        </li>
      </ul>
      <h2>Posts</h2>
      <ul>
        <li>
          <Link to="/home-server-evolution-stone-age/">
            A home server evolution: the stone age
          </Link>{' '}
          (18 June 2021)
        </li>
        <li>
          <Link to="/writing-css-for-print/">Writing CSS for print</Link> (18
          August 2021)
        </li>
      </ul>
    </main>
    <footer className={styles.footer}>
      <a href="https://github.com/jelefra">GitHub</a> -{' '}
      <a href="https://www.linkedin.com/in/jeremylefrancois/">LinkedIn</a>
    </footer>
  </Container>
);

export default Home;
