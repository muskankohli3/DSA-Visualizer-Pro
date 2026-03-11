import React, { useState } from "react";

class Node {
  constructor(value, x, y) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
  }
}

function BinaryTreeVisualizer() {
  const [root, setRoot] = useState(null);
  const [value, setValue] = useState("");

  const insertNode = (node, value, x, y, level = 1) => {
    if (!node) return new Node(value, x, y);

    const offset = 120 / level;

    if (value < node.value) {
      node.left = insertNode(
        node.left,
        value,
        node.x - offset,
        node.y + 80,
        level + 1
      );
    } else {
      node.right = insertNode(
        node.right,
        value,
        node.x + offset,
        node.y + 80,
        level + 1
      );
    }

    return node;
  };

  const insert = () => {
    if (!value) return;
    const newRoot = insertNode(root, parseInt(value), 300, 50);
    setRoot({ ...newRoot });
    setValue("");
  };

  const renderTree = (node) => {
    if (!node) return null;

    return (
      <g key={node.value}>
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#aaa"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#aaa"
          />
        )}

        <circle cx={node.x} cy={node.y} r="20" className="tree-node" />
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="white"
          fontWeight="bold"
        >
          {node.value}
        </text>

        {renderTree(node.left)}
        {renderTree(node.right)}
      </g>
    );
  };

  return (
    <div className="container">
      <h2>Binary Search Tree (Visual)</h2>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Insert value"
      />
      <button onClick={insert}>Insert</button>

      <svg width="600" height="400">
        {renderTree(root)}
      </svg>
    </div>
  );
}

export default BinaryTreeVisualizer;