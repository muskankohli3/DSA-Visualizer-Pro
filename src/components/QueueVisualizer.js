import React, { useState } from "react";

function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");

  const enqueue = () => {
    if (value === "") return;
    setQueue([...queue, value]);
    setValue("");
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    setQueue(queue.slice(1));
  };

  return (
    <div className="container">
      <h2>Queue Visualizer (FIFO)</h2>

      <div className="controls">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>
      </div>

      <div className="queue-container">
        {queue.map((item, index) => (
          <div key={index} className="queue-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QueueVisualizer;