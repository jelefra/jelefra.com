import frequencies from '../constants/frequencies';

const FREQUENCIES_VALUES = Object.values(frequencies);
const FREQUENCIES_ENTRIES = Object.entries(frequencies);

const getNoteFromFrequency = (frequency) => {
  const note = FREQUENCIES_ENTRIES.reduce(
    (previous, current) =>
      Math.abs(current[1] - frequency) < Math.abs(previous[1] - frequency)
        ? current
        : previous,
    // The slider goes down to 1 Hz so the placeholder frequency
    // needs to be < -16.35 Hz for the function to match 1 hz to C0
    ['', -20]
  );

  return { note: note[0], isExact: FREQUENCIES_VALUES.includes(frequency) };
};

export default getNoteFromFrequency;
