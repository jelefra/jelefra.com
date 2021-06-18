import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import React from 'react';

import Container from '../Container';
import styles from './homeServerEvolutionStoneAge.module.scss';

const Post = () => {
  return (
    <Container>
      <Helmet>
        <title>A home server evolution: the stone age</title>
        <meta
          name="description"
          content="How to use an old Raspberry Pi as a Samba server to share files on the network and take advantage of DLNA to play videos on a smart TV."
        />
      </Helmet>
      <Link to="/" className={styles.backTop}>
        ← Home
      </Link>
      <time dateTime="2021-06-18 12:00">18 June 2021</time>
      <article className={styles.article}>
        <h1>A home server evolution: the stone age</h1>
        <p>
          If money wasn&apos;t a factor, I would splash some cash on a nice NAS
          and that would probably be the end of my home server journey.
        </p>
        <p>
          But what if I could get started with what I already have laying
          around? Anything would be an improvement over copying files to a USB
          key and carrying it around.
        </p>
        <p>
          My objective is simple: share files on the network and play videos on
          the TV.
        </p>
        <p>
          I have a Raspberry Pi Model B available. It&apos;s the first
          generation of Raspberry Pi, released in 2012, and featuring 512 MB of
          RAM and a 700 MHz CPU. That&apos;s not powerful enough to run popular
          media player software like Kodi or Plex. At a bare minimum, Plex
          recommends 1.2 GHz to play a video with no transcoding.
        </p>
        <p>
          However, my TV happens to be a smart TV and is DLNA certified. This
          means the TV follows certain standards, including Universal Plug and
          Play (UPnP). So the Raspberry Pi can serve files on the network, and
          some DLNA software can be installed on top of it to serve the shared
          media files.
        </p>
        <p>
          This setup works surprisingly well: it allows to play on the TV any
          video stored on the Pi. It&apos;s even possible to play 4K videos
          without buffering, something I wasn&apos;t expecting. General file
          sharing on the network works well too.
        </p>
        <p>
          Added bonus: the TV can also play music and display photos. If
          navigation was a little more intuitive and snappier, I may actually
          enjoy using these features from time to time.
        </p>
        <p>
          The main downside is the speed of transfer: it takes close to 3
          minutes to copy 1 GB to the device (average speed of 6 MB/s). The
          Raspberry Pi has USB 2.0 ports so I had low expectations.
        </p>
        <h2>Equipment</h2>
        <ul>
          <li>Raspberry Pi </li>
          <li>SD card (8 GB, for the OS)</li>
          <li>USB key (16 GB, for storage)</li>
          <li>ethernet cable (to connect the Pi to the router)</li>
        </ul>
        <p>
          I have tried to use a spare external hard drive but the Pi
          couldn&apos;t supply it with enough power, so I&apos;m sticking to the
          USB stick.
        </p>
        <h2>Format the USB key</h2>
        <ol>
          <li className={styles.listDisc}>
            <p>
              List information about block devices and identify the disk name
              (assumed to be &quot;sda&quot; in the next few snippets):
            </p>
            <code className={styles.code}>lsblk</code>
          </li>
          <li className={styles.listDisc}>
            <p>Create a GPT partition table:</p>
            <code className={styles.code}>
              sudo parted /dev/sda --script -- mklabel gpt
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Create an EXT4 partition that takes up the whole space:</p>
            <code className={styles.code}>
              sudo parted /dev/sda --script -- mkpart primary ext4 0% 100%
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Format the partition to ext4:</p>
            <code className={styles.code}>sudo mkfs.ext4 -F /dev/sda1</code>
          </li>
        </ol>
        <h2>Set up the home server</h2>
        <p>
          I have chosen Samba (implementing the SMB protocol) to not restrict
          network access to a certain OS (NFS being used for Linux, and AFS for
          Mac).
        </p>
        <ol>
          <li className={styles.listDisc}>
            <p>
              Create the share directory with read, write, and execute
              permissions:
            </p>
            <code className={styles.code}>
              sudo mkdir -m 777 /media/key/share
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Mount the drive to this new directory:</p>
            <code className={styles.code}>
              sudo mount -t auto /dev/sda1 /media/key
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Install Samba:</p>
            <code className={styles.code}>
              sudo apt-get install samba samba-common-bin
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Backup the default config:</p>
            <code className={styles.code}>
              sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.default
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Edit the config:</p>
            <code className={styles.code}>sudo nano /etc/samba/smb.conf</code>
          </li>
          <li className={styles.listDisc}>
            <p>Add the share configuration at the bottom of the file:</p>
            <pre className={styles.code}>
              <span className={styles.block}>[home]</span>
              <span className={styles.block}>comment = Home</span>
              <span className={styles.block}>
                path = &quot;/media/key/share&quot;
              </span>
              <span className={styles.block}>writeable = yes</span>
              <span className={styles.block}>guest ok = yes</span>
              <span className={styles.block}>create mask = 0777 directory</span>
              <span className={styles.block}>mask = 0777</span>
              <span className={styles.block}>force user = pi</span>
            </pre>
          </li>
          <li className={styles.listDisc}>
            <p>Allow the &quot;pi&quot; user to connect to shares:</p>
            <code className={styles.code}>sudo smbpasswd -a pi</code>
          </li>
          <li className={styles.listDisc}>
            <p>Restart Samba:</p>
            <code className={styles.code}>sudo systemctl restart smbd</code>
          </li>
          <li className={styles.listDisc}>
            <p>
              Edit fstab configuration so that the drive mounts whenever the Pi
              reboots:
            </p>
            <code className={styles.code}>
              sudo nano /etc/fstab /dev/sda1 /media/key auto noatime 0 0
            </code>
          </li>
          <li className={styles.listDisc}>
            <p>Access the share on a Mac:</p>
            <p>
              Finder &gt; Go &gt; Connect to server &gt;
              smb://192.168.0.XX/share
            </p>
            <p>
              Use the Pi&apos;s IP address and login with the &quot;pi&quot;
              user and the Samba password.
            </p>
          </li>
          <li className={styles.listDisc}>
            <p>Automatically mount the drive on a Mac:</p>
            <p>
              System Preferences &gt; Users & Groups &gt; Login Items &gt; Add
              an item to the Login Items list
            </p>
          </li>
        </ol>
        <h2>Set up DLNA</h2>
        <ol>
          <li className={styles.listDisc}>
            <p>Install miniDLNA:</p>
            <code className={styles.code}>sudo apt-get install minidlna</code>
          </li>
          <li className={styles.listDisc}>
            <p>Edit the miniDLNA config:</p>
            <code className={styles.code}>sudo nano /etc/minidlna.conf</code>
          </li>
          <li className={styles.listDisc}>
            <p>Specify the source directory:</p>
            <code className={styles.code}>media_dir=/media/key/share</code>
          </li>
          <li className={styles.listDisc}>
            <p>Set the display name:</p>
            <code className={styles.code}>friendly_name=Home</code>
          </li>
          <li className={styles.listDisc}>
            <p>Start miniDLNA:</p>
            <code className={styles.code}>sudo service minidlna start</code>
          </li>
          <li className={styles.listDisc}>
            <p>
              Whenever changing the config, restart miniDLNA for the change to
              take effect:
            </p>
            <code className={styles.code}>sudo service minidlna restart</code>
          </li>
        </ol>
        <h2>Final thoughts</h2>
        <p>
          It works! But the limited size of the USB key and the slow speed of
          transfer are major limitations. I have some ideas about how to upgrade
          the setup and bring it from the stone age to the contemporary times.
          Using a secondhand workstation seems like a smart option, but an
          easier upgrade could consist in getting a more recent Raspberry Pi and
          an SSD. A project for another day!
        </p>
      </article>
      <Link to="/" className={styles.backBottom}>
        ← Home
      </Link>
    </Container>
  );
};

export default Post;
