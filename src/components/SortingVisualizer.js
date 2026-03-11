import React, { useState, useEffect } from "react";
import { bubbleSort } from "../algorithms/BubbleSort";
import { mergeSort } from "../algorithms/MergeSort";
import { quickSort } from "../algorithms/QuickSort";
import Controls from "./Controls";

function SortingVisualizer({ darkMode }) {
  const [array, setArray] = useState([]);
  const [viewMode, setViewMode] = useState("bars"); 
  const [speed, setSpeed] = useState(200); 
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    if (isAnimating) return;
    const newArr = [];
    for (let i = 0; i < 30; i++) {
      newArr.push(Math.floor(Math.random() * 200) + 20);
    }
    setArray(newArr);
  };

  const setCustomArray = (input) => {
    if (isAnimating) return;
    const values = input
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v));
    if (values.length > 0) setArray(values);
  };

  const getColors = () => {
    if (darkMode) {
      return {
        primary: "#3399ff",
        compare: "#ff6666",
        pivot: "#ffb84d",
      };
    } else {
      return {
        primary: "#4da6ff",
        compare: "#ff4d4d",
        pivot: "#ffa500",
      };
    }
  };

  const animate = (animations) => {
  setIsAnimating(true);
  const arr = [...array];
  const { primary, compare, pivot } = getColors();

  let totalDelay = 0;

  animations.forEach((animation) => {
    const duration = speed;

    setTimeout(() => {
      const bars = document.getElementsByClassName("array-bar");

      const safeBar = (i) => (bars[i] ? bars[i] : null);

      switch (animation.type) {
        case "compare": {
          const [a, b] = animation.indices;
          const barA = safeBar(a);
          const barB = safeBar(b);
          if (barA && barB) {
            barA.style.backgroundColor = compare;
            barB.style.backgroundColor = compare;

            setTimeout(() => {
              barA.style.backgroundColor = primary;
              barB.style.backgroundColor = primary;
            }, duration * 0.9);
          }
          break;
        }

        case "swap": {
          const [i1, i2] = animation.indices;
          if (i1 < arr.length && i2 < arr.length) {
            [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
            setArray([...arr]);
          }
          break;
        }

        case "overwrite": {
          if (animation.index < arr.length) {
            arr[animation.index] = animation.value;
            setArray([...arr]);
          }
          break;
        }

        case "pivot": {
          const bar = safeBar(animation.index);
          if (bar) bar.style.backgroundColor = pivot;
          break;
        }

        default:
          break;
      }
    }, totalDelay);

    totalDelay += duration;
  });

  setTimeout(() => setIsAnimating(false), totalDelay + speed);
};

  const handleSort = (type) => {
    if (isAnimating) return;

    let animations = [];

    if (type === "bubble") animations = bubbleSort(array);
    if (type === "merge") animations = mergeSort(array);
    if (type === "quick") animations = quickSort(array);

    animate(animations);
  };

  const { primary } = getColors();

  return (
    <div className={darkMode ? "dark container" : "container"}>
      <Controls
        onRandom={generateRandomArray}
        onSort={handleSort}
        setCustomArray={setCustomArray}
        viewMode={viewMode}
        setViewMode={setViewMode}
        speed={speed}
        setSpeed={setSpeed}
        isAnimating={isAnimating}
      />

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: primary,
              transition: `height ${speed}ms ease, background-color ${
                speed * 0.8
              }ms ease`,
            }}
          >
            {viewMode === "numbers" && (
              <span className="bar-number">{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;