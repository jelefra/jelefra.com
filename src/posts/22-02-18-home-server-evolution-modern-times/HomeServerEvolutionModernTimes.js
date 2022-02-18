import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';

import Container from '../../Container';
import styles from './HomeServerEvolutionModernTimes.module.scss';

const Post = () => {
  return (
    <Container>
      <Helmet>
        <title>A home server evolution: the modern times</title>
        <meta
          name="description"
          content="How to install Plex via Docker, use an external hard drive to store the media library, and enable network access with Samba."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'BlogPosting',
            datePublished: '2022-02-18',
            dateModified: '2022-02-18',
            headline: 'A home server evolution: the modern times',
            author: {
              '@type': 'Person',
              name: 'Jeremy Le François',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Jeremy Le François',
              logo: {
                '@type': 'ImageObject',
                url: 'https://jelefra.com/icon-512.png',
                width: '512',
                height: '512',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
            },
          })}
        </script>
      </Helmet>
      <Link to="/" className={styles.backTop}>
        ← Home
      </Link>
      <time dateTime="2022-02-18 12:00">18 February 2022</time>
      <article className={styles.article}>
        <h1>A home server evolution: the modern times</h1>
        <p>
          While it technically worked, my Raspberry Pi home server wasn&apos;t
          practical and it had several limitations: virtually no storage space,
          slow data transfers, and a UI that relied on the TV&apos;s OS. It was
          time for a change.
        </p>
        <p>
          I originally planned to upgrade from a Raspberry Pi to a Raspberry Pi
          4, but the global chip shortage didn&apos;t let me. The Raspberry Pi 4
          has been out of stock for some time, and I needed an alternative. It
          turns out that I already had one, lying around in the form of an
          unused HP laptop. Why didn&apos;t I consider this before? In addition
          to being ready to use (no need to sort out power supply / case /
          storage), the laptop (a HP ZBook 14u G5) outperforms the Raspberry Pi
          4:
        </p>
        <table>
          <thead>
            <tr>
              <th />
              <th>Raspberry Pi 4</th>
              <th>HP ZBook 14u G5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Processor</td>
              <td>
                ARM Cortex-A72
                <br />
                1.5 GHz 64-bit quad-core
              </td>
              <td>
                i5-8350U
                <br />
                1.7 GHz 64-bit quad-core
              </td>
            </tr>
            <tr>
              <td>Hard drive</td>
              <td>N/A</td>
              <td>256 GB M.2 NVMe</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>4 GB / 8 GB</td>
              <td>8 GB</td>
            </tr>
          </tbody>
        </table>
        <p>
          To start things off, I installed Ubuntu and set up SSH. It was then
          time to deal with the media server software. Plex regularly popped up
          in my research and I decided to give it a go.
        </p>
        <h2>Installing Plex</h2>
        <ol>
          <li className={styles.listDisc}>
            <p>
              Until now, I haven&apos;t used Docker for personal projects so
              decided to install Plex via the official Docker container.
            </p>
            <p>
              I converted the <span className={styles.code}>docker run</span>{' '}
              command to a Docker Compose file to be able to version control the
              configuration with ease:
            </p>
            {/*prettier-ignore*/}
            <pre className={styles.code}>
              <span className={styles.block}>version: &quot;3&quot;</span>
              <span className={styles.block}> </span>
              <span className={styles.block}>services:</span>
              <span className={styles.block}>  pms-docker:</span>
              <span className={styles.block}>    container_name: plex</span>
              <span className={styles.block}>    network_mode: host</span>
              <span className={styles.block}>    environment:</span>
              <span className={styles.block}>      - TZ: &apos;Europe/London&apos;</span>
              <span className={styles.block}>      # Get claim code from https://www.plex.tv/claim/</span>
              <span className={styles.block}>      - PLEX_CLAIM: &apos;claim-____________________&apos;</span>
              <span className={styles.block}>    volumes:</span>
              <span className={styles.block}>      - &apos;/home/jeremy/Plex:/config&apos;</span>
              <span className={styles.block}>      - &apos;/home/jeremy/Plex:/transcode&apos;</span>
              <span className={styles.block}>      - &apos;/home/jeremy/Media:/media&apos;</span>
              <span className={styles.block}>      - &apos;/media/drive:/drive&apos;</span>
              <span className={styles.block}>    image: plexinc/pms-docker</span>
            </pre>
          </li>
          <li className={styles.listDisc}>
            <p>Run the docker script:</p>
            <code className={styles.code}>docker compose up</code>
          </li>
          <li className={styles.listDisc}>
            <p>Start Plex:</p>
            <code className={styles.code}>docker start plex</code>
          </li>
          <li className={styles.listDisc}>
            <p>
              I then installed the Plex app on the smart TV from the TV&apos;s
              app store, and also installed the Plex apps on Android and iPhone
              phones.
            </p>
          </li>
        </ol>
        <p>At this point, Plex works smoothly on all devices:</p>
        <ul>
          <li>
            <p>Displays personal photos</p>
          </li>
          <li>
            <p>Plays personal videos</p>
          </li>
          <li>
            <p>Plays films and series, including subtitles</p>
          </li>
          <li>
            <p>Plays music</p>
          </li>
        </ul>
        <p>
          However, the library needs to be managed from the laptop. Let&apos;s
          share a directory to make it more convenient to use.
        </p>
        <h2>Share directories across the network with Samba</h2>
        <ol>
          <li className={styles.listDisc}>
            <p>Open the Samba config:</p>
            <code className={styles.code}>nano /etc/samba/smb.conf</code>
            <p>Add the share:</p>
            {/*prettier-ignore*/}
            <pre className={styles.code}>
              <span className={styles.block}>[Media]</span>
              <span className={styles.block}>  comment = Media</span>
              <span className={styles.block}>  path = /home/jeremy/Media</span>
              <span className={styles.block}>  read only = no</span>
              <span className={styles.block}>  browsable = yes</span>
            </pre>
            <p>
              I chose to share one generic directory (as opposed to separate
              &quot;Photos&quot;, &quot;Other Videos&quot;, &quot;Movies&quot;,
              and &quot;Music&quot; directories) to keep the configuration
              simple and avoid having to tweak the Samba config again in the
              future.
            </p>
          </li>
          <li className={styles.listDisc}>
            <p>Restart Samba:</p>
            <code className={styles.code}>service smbd restart</code>
          </li>
          <li className={styles.listDisc}>
            <p>Setup Samba user password:</p>
            <code className={styles.code}>smbpasswd -a jeremy</code>
          </li>
          <li className={styles.listDisc}>
            <p>Access the share on a Mac:</p>
            <p>
              Finder &gt; Go &gt; Connect to server &gt;
              smb://192.168.0.XX/Media
            </p>
          </li>
        </ol>
        <p>
          At this point, the Plex library can be managed from the network.
          However, storage is limited to the 256 GB internal drive. It&apos;s a
          good start, but I have an unused external hard drive available and
          decided to add it to the mix.
        </p>
        <h2>Use an external hard drive for extra storage</h2>
        <ol>
          <li className={styles.listDisc}>
            <p>
              For the sake of Linux / macOS (and Windows) compatibility, I
              formatted the drive to exFAT.
            </p>
          </li>
          <li className={styles.listDisc}>
            <p>Plug in the hard drive, then identify the disk and partition:</p>
            <code className={styles.code}>fdisk -l</code>
          </li>
          <li className={styles.listDisc}>
            <p>Mount the partition to the desired location:</p>
            <code className={styles.code}>mount /dev/sda1 /media/drive</code>
            <p>We can now use the drive to store the Plex library.</p>
          </li>
          <li className={styles.listDisc}>
            <p>
              Update the Samba config to share the drive. Just like before, the
              whole drive is shared to keep the config simple and generic:
            </p>
            {/*prettier-ignore*/}
            <pre className={styles.code}>
              <span className={styles.block}>[Drive]</span>
              <span className={styles.block}>  comment = Drive</span>
              <span className={styles.block}>  path = /media/drive</span>
              <span className={styles.block}>  read only = no</span>
              <span className={styles.block}>  browsable = yes</span>
            </pre>
          </li>
          <li className={styles.listDisc}>
            <p>
              It all works, but we need the drive to be automatically mounted
              after restarting the laptop so that the library is always
              accessible.
            </p>
            <p>Identify the partition by its UUID:</p>
            <code className={styles.code}>blkid /dev/sda1</code>
          </li>
          <li className={styles.listDisc}>
            <p>Confirm the id of the current user:</p>
            <code className={styles.code}>
              grep ^&quot;$USER&quot; /etc/group
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Open the fstab config:</p>
            <code className={styles.code}>nano /etc/fstab</code>
            <p>Add an entry for the drive:</p>
            <code className={styles.code}>
              UUID=61E5-34D7 /media/drive exfat
              fmask=000,dmask=000,uid=1000,gid=1000 0 2
            </code>
            <p>Comments:</p>
            <ul>
              <li>We identify the partition by its UUID.</li>
              <li>
                <code className={styles.code}>fmask</code> and{' '}
                <code className={styles.code}>dmask</code> set the bitmask of
                the permissions that are not present to &quot;no
                permission&quot;.
              </li>
              <li>
                <code className={styles.code}>uid</code> and{' '}
                <code className={styles.code}>gid</code> set the owner and group
                of all files. We assign them to the current user.
              </li>
              <li>
                Setting the last field to <code className={styles.code}>2</code>{' '}
                means the filesystem is checked on boot after the root
                filesystem.
              </li>
            </ul>
          </li>
        </ol>
        <h2>Final tweaks</h2>
        <ul>
          <li>
            <p>On macOS, mount the volume on user login:</p>
            <p>
              System Preferences &gt; Users & Groups &gt; Login Items &gt; Add
              an item to the Login Items list
            </p>
          </li>
          <li>
            <p>
              Give the IP address a friendly name to make SSH easier from the
              host:
            </p>
            <code className={styles.code}>
              nano /etc/hosts 192.168.0.XX &lt;server name&gt;
            </code>
          </li>
        </ul>
        <h2>Transfer speed</h2>
        <p>
          Whether it&apos;s to the laptop&apos;s internal NVMe drive or to the
          external hard drive, transfer speed averages 10.5 MB/s. It&apos;s
          lower than I was expecting and I&apos;ll need to look into it. At this
          speed, it takes around 1min45s to transfer 1 GB of data. Even though
          it&apos;s not fast, it&apos;s not a problem given my usage.
        </p>
        <h2>Conclusion</h2>
        <p>
          Compared to a Raspberry Pi, the laptop has a larger footprint but I
          have space so it&apos;s not a problem. It also consumes more power. I
          don&apos;t know the real-world values, but the processor thermal
          design power (TDP) reaches 15 W vs 7 W for the Raspberry Pi.
          Apparently a Raspberry Pi consume around 3-5 W under normal load. The
          laptop may be around 7-11 W, which I&apos;m OK with.
        </p>
        <p>
          If needed, I could easily swap or extend the external hard drive. The
          UUID reference would simply need to be updated.
        </p>
        <p>
          To mitigate any drive failure (whether internal or external), I plan
          to run manual backups every now and then. This covers the media data
          as well as the Plex user data.
        </p>
        <p>
          I have been using the home server regularly over the past month and
          couldn&apos;t be happier. Being able to stream personal photos and
          videos on the TV is new to me and works great.
        </p>
        <p>
          The setup isn&apos;t perfect, and in the future I can envision
          upgrading to a NAS with data redundancy. For now, I enjoy what I have
          and there are plenty of opportunities to explore. Two come to mind:
          setting up automatic time machine backups, and moving some simple
          cloud-hosted applications to the server (something I couldn&apos;t do
          with the old Raspberry Pi due to its CPU architecture and limited
          performance).
        </p>
      </article>
      <Link to="/" className={styles.backBottom}>
        ← Home
      </Link>
    </Container>
  );
};

export default Post;
