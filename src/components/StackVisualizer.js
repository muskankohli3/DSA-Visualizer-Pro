import React, { useState } from "react";

function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");

  const push = () => {
    if (value === "") return;
    setStack([...stack, value]);
    setValue("");
  };

  const pop = () => {
    if (stack.length === 0) return;
    setStack(stack.slice(0, stack.length - 1));
  };

  return (
    <div className="container">
      <h2>Stack Visualizer (LIFO)</h2>

      <div className="controls">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
      </div>

      <div className="stack-container">
        {stack.map((item, index) => (
          <div key={index} className="stack-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StackVisualizer;