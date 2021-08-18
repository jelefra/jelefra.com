import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';

import Container from '../../Container';
import styles from '../21-08-18-writing-css-for-print/writingCssForPrint.module.scss';

const Post = () => {
  return (
    <Container>
      <Helmet>
        <title>Writing CSS for print</title>
        <meta
          name="description"
          content="How to write CSS when you intend to print a web page."
        />
      </Helmet>
      <Link to="/" className={styles.backTop}>
        ← Home
      </Link>
      <time dateTime="2021-08-18 12:00">18 August 2021</time>
      <article className={styles.article}>
        <h1>Writing CSS for print</h1>
        <p>
          Sometimes, writing CSS is a great way to design something that will
          exist primarily in print form.
        </p>
        <p>
          The saying goes{' '}
          <i>
            &quot;If the only tool you have is a hammer, you will start treating
            all your problems like a nail.&quot;
          </i>
          . Maybe I&apos;m guilty. I still think that for a recent project, CSS
          was just what I needed.
        </p>
        <p>The project involved designing a poster with this layout:</p>
        <img
          width="329"
          height="442"
          src="./sketch.png"
          alt="Sketch of a poster"
        />
        <p>
          The inner rectangles represent images that all have the same
          dimensions. The poster was going to be printed in A3 format.
        </p>
        <p>
          I designed the poster by writing CSS and checked progress against a
          print preview which was using the A4 default.
        </p>
        <p>
          The printing company needed a PDF version of the poster. When it came
          to saving the PDF in A3 format, the layout got messed up. The design
          hadn&apos;t scaled: the font sizes and spacings were smaller.
        </p>
        <h2>
          <span className={styles.code}>px</span>
        </h2>
        <p>
          The layout didn&apos;t scale because font sizes and spacings were
          styled in <span className={styles.code}>px</span>.
        </p>
        <p>
          It&apos;s expected that an <em>absolute length unit</em> like the
          pixel won&apos;t scale: when going from A4 to A3, the pixel size of
          the page (at 72 DPI) increases from 594x840 to 840x1189, so any fixed
          font size or spacing will be smaller relatively to the page.
        </p>
        <h2>
          <span className={styles.code}>em</span> /{' '}
          <span className={styles.code}>rem</span>
        </h2>
        <p>
          Using a <em>relative length unit</em> like{' '}
          <span className={styles.code}>em</span> or{' '}
          <span className={styles.code}>rem</span> solves part of the problem.
          Once all values use <span className={styles.code}>em</span> /{' '}
          <span className={styles.code}>rem</span>, the layout can be controlled
          by setting the font-size on the parent or base{' '}
          <span className={styles.code}>html</span> element.
        </p>
        <p>
          It&apos;s an improvement, but isn&apos;t perfect, as the font size
          still needs to be adjusted for each page size (
          <span className={styles.code}>16px</span> for A3,{' '}
          <span className={styles.code}>11px</span> for A4,{' '}
          <span className={styles.code}>8px</span> for A5, etc.).
        </p>
        <h2>vh / vw</h2>
        <p>
          The solution came from another group of relative units:{' '}
          <span className={styles.code}>vh</span> /{' '}
          <span className={styles.code}>vw</span>.
        </p>
        <ul>
          <li>
            <span className={styles.code}>1vh</span> = 1% of the viewport height
          </li>
          <li>
            <span className={styles.code}>1vw</span> = 1% of the viewport width
          </li>
        </ul>
        <p>
          Given the project&apos;s layout is determined by the columns&apos;
          width, <span className={styles.code}>vw</span> was more appropriate.
        </p>
        <p>
          Defining the base <span className={styles.code}>font-size</span> in{' '}
          <span className={styles.code}>vw</span> and all other sizes relatively
          to it with <span className={styles.code}>em</span> /{' '}
          <span className={styles.code}>rem</span> just works.
        </p>
        <pre className={styles.code}>
          <span className={styles.block}>{'html {'}</span>
          <span className={styles.block}>{'  font-size: 1.4vw'}</span>
          <span className={styles.block}>{'}'}</span>
          <span className={styles.block}> </span>
          <span className={styles.block}>{'h1 {'}</span>
          <span className={styles.block}>{'  font-size: 0.9rem'}</span>
          <span className={styles.block}>{'  margin: 4rem 0'}</span>
          <span className={styles.block}>{'}'}</span>
          <span className={styles.block}>{'...'}</span>
        </pre>
        <h2>Plot twist</h2>
        <p>
          For my project there was no need to save the PDF in another size than
          the default. Saving the webpage as a PDF with a pixel size of 594x840
          (A4), and then printing it on an A3 sheet of paper would <em>not</em>{' '}
          have deteriorated the quality of the print. PDF files have a size in
          pixels but it turns out that it&apos;s misleading to say they have a{' '}
          <em>resolution</em>: any text or vector graphic is rendered at the
          desired output resolution, and images in a PDF maintain their own
          resolution.
        </p>
        <p>
          That said, when saving a PDF in a larger size is required, the above
          method works.
        </p>
        <p>Nailed it. </p>
      </article>
      <Link to="/" className={styles.backBottom}>
        ← Home
      </Link>
    </Container>
  );
};

export default Post;
