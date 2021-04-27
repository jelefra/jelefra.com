import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => (
  <div className="container">
    <main>
      <p>Hi, my name is</p>
      <h1>Jeremy Le François.</h1>
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
    </main>
    <footer>
      <a href="https://github.com/jelefra">GitHub</a> -{' '}
      <a href="https://www.linkedin.com/in/jeremylefrancois/">LinkedIn</a>
    </footer>
  </div>
);

export default Home;
