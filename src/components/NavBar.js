import React from "react";

function Navbar({ darkMode, setDarkMode, activeView, setActiveView }) {
  return (
    <div className="navbar">
      <h2>DSA Visualizer Pro</h2>

      <select
        value={activeView}
        onChange={(e) => setActiveView(e.target.value)}
      >
        <option value="sorting">Sorting</option>
        <option value="stack">Stack</option>
        <option value="queue">Queue</option>
        <option value="binaryTree">Binary Tree</option>
        <option value="mst">MST (Prim / Kruskal)</option>
      </select>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Navbar;