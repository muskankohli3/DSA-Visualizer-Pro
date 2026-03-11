import React, { useState } from "react";

function Controls({
  onRandom,
  onSort,
  setCustomArray,
  viewMode,
  setViewMode,
  speed,
  setSpeed,
  isAnimating,
}) {
  const [input, setInput] = useState("");

  return (
    <div className="controls">
      <button onClick={onRandom} disabled={isAnimating}>
        Generate Random
      </button>

      <button onClick={() => onSort("bubble")} disabled={isAnimating}>
        Bubble Sort
      </button>

      <button onClick={() => onSort("merge")} disabled={isAnimating}>
        Merge Sort
      </button>

      <button onClick={() => onSort("quick")} disabled={isAnimating}>
        Quick Sort
      </button>

      <button
        onClick={() =>
          setViewMode(viewMode === "bars" ? "numbers" : "bars")
        }
      >
        Toggle View
      </button>

      <input
        type="text"
        placeholder="Enter numbers: 5,3,8,1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => setCustomArray(input)} disabled={isAnimating}>
        Set Array
      </button>

      <label>
        Speed:
        <input
          type="range"
          min="10"
          max="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export default Controls;