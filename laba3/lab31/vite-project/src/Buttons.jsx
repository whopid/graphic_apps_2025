import React, { useState } from 'react';

const Buttons = ({ count = 5 }) => {
  const [counters, setCounters] = useState(Array(count).fill(0));
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const handleClick = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    setLastClickedIndex(index);
  };

  return (
    <div>
      {counters.map((counter, index) => (
        <button
          key={index}
          className={`btn m-1 ${
            index === lastClickedIndex ? 'btn-success' : 'btn-primary'
          }`}
          onClick={() => handleClick(index)}
        >
          {counter}
        </button>
      ))}
    </div>
  );
};

export default Buttons;