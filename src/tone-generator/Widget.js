import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import WidgetUI from './WidgetUI';
import WidgetUICompact from './WidgetUICompact';
import frequencies from './constants/frequencies';

const Widget = ({ multi }) => {
  const minFrequency = 1;
  const maxFrequency = 5000;

  const [audioContext, setAudioContext] = useState(null);

  const [tone, setTone] = useState({
    frequency: 440,
    gain: 0.7,
    gainNode: undefined,
    pan: 0,
    stereoPannerNode: undefined,
    waveform: 'sine',
    oscillatorNode: undefined,
  });

  const {
    frequency,
    gain,
    gainNode,
    pan,
    stereoPannerNode,
    waveform,
    oscillatorNode,
  } = tone;

  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    return function cleanup() {
      stopTone();
    };
  }, [oscillatorNode]);

  const handleChangeIncrementFrequency = (increment) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value += increment;
    }
    setTone({
      ...tone,
      frequency: frequency + increment,
    });
  };

  const handleChangeFrequency = (event) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = event.target.value;
    }
    setTone({
      ...tone,
      frequency: Number(event.target.value),
    });
  };

  const handleChangeGain = (event) => {
    if (gainNode) {
      gainNode.gain.value = Number(event.target.value);
    }
    setTone({
      ...tone,
      gain: Number(event.target.value),
    });
  };

  const handleChangeStereoPanner = (event) => {
    if (stereoPannerNode) {
      stereoPannerNode.pan.value = Number(event.target.value);
    }
    setTone({ ...tone, pan: Number(event.target.value) });
  };

  const handleChangeNote = (note) => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = frequencies[note];
    }
    setTone({
      ...tone,
      frequency: frequencies[note],
    });
    handleModalVisibility();
  };

  const handleChangeWaveform = (value) => {
    if (oscillatorNode) {
      oscillatorNode.type = value;
    }
    setTone({ ...tone, waveform: value });
  };

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const initialiseAudioContext = () => {
    const audioContext = new window.AudioContext();
    setAudioContext(audioContext);
    return audioContext;
  };

  const createGainNode = (audioContext) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = gain;
    setTone((prevState) => ({ ...prevState, gainNode: gainNode }));
    return gainNode;
  };

  const createStereoPannerNode = (audioContext) => {
    const stereoPannerNode = audioContext.createStereoPanner();
    stereoPannerNode.pan.value = pan;
    setTone((prevState) => ({
      ...prevState,
      stereoPannerNode: stereoPannerNode,
    }));
    return stereoPannerNode;
  };

  const togglePlay = () => (oscillatorNode ? stopTone() : playTone());

  const playTone = () => {
    const audioCtx = audioContext || initialiseAudioContext();
    const gainNodeInstance = gainNode || createGainNode(audioCtx);
    const stereoPanner = stereoPannerNode || createStereoPannerNode(audioCtx);

    if (!oscillatorNode) {
      const oscillatorNode = audioCtx.createOscillator();
      oscillatorNode.frequency.value = frequency;
      oscillatorNode.type = waveform;
      oscillatorNode
        .connect(gainNodeInstance)
        .connect(stereoPanner)
        .connect(audioCtx.destination);

      // Increase gain gradually to prevent clicking sound
      gainNodeInstance.gain.value = 0;
      oscillatorNode.start();
      gainNodeInstance.gain.setTargetAtTime(gain, audioCtx.currentTime, 0.3);

      setTone((prevState) => ({
        ...prevState,
        oscillatorNode: oscillatorNode,
      }));
    }
  };

  const stopTone = () => {
    if (oscillatorNode) {
      // Decrease gain gradually to prevent clicking sound
      gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.01);
      setTone((prevState) => ({
        ...prevState,
        oscillatorNode: null,
        gainNode: null,
      }));
    }
  };

  const props = {
    minFrequency: minFrequency,
    maxFrequency: maxFrequency,
    frequency: frequency,
    gain: gain,
    pan: pan,
    waveform: waveform,
    oscillatorNode: oscillatorNode,
    modalVisibility: modalVisibility,
    togglePlay: togglePlay,
    handleChangeFrequency: handleChangeFrequency,
    handleChangeGain: handleChangeGain,
    handleChangeStereoPanner: handleChangeStereoPanner,
    handleChangeWaveform: handleChangeWaveform,
    handleModalVisibility: handleModalVisibility,
    handleChangeNote: handleChangeNote,
  };

  return !multi ? (
    <WidgetUI
      {...props}
      handleChangeIncrementFrequency={handleChangeIncrementFrequency}
    />
  ) : (
    <WidgetUICompact {...props} />
  );
};

export default Widget;

Widget.propTypes = {
  multi: PropTypes.bool,
};
