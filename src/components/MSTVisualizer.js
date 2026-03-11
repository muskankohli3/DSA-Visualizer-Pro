import React, { useState } from "react";

const nodes = {
  A: { x: 200, y: 50 },
  B: { x: 100, y: 150 },
  C: { x: 300, y: 150 },
  D: { x: 200, y: 270 }
};

const initialEdges = [
  { u: "A", v: "B", w: 4 },
  { u: "A", v: "C", w: 2 },
  { u: "B", v: "C", w: 1 },
  { u: "B", v: "B", w: 0 }, 
  { u: "B", v: "D", w: 5 },
  { u: "C", v: "D", w: 8 }
].filter(e => e.u !== e.v); 

function MSTVisualizer() {
  const [edges] = useState(initialEdges);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [algo, setAlgo] = useState("kruskal");
  const kruskal = () => {
    const sorted = [...edges].sort((a, b) => a.w - b.w);

    const parent = {};
    Object.keys(nodes).forEach(n => (parent[n] = n));

    const find = (x) => {
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    };

    const union = (x, y) => {
      parent[find(x)] = find(y);
    };

    const mst = [];

    for (let edge of sorted) {
      if (find(edge.u) !== find(edge.v)) {
        mst.push(edge);
        union(edge.u, edge.v);
      }
    }

    return mst;
  };
  const prim = () => {
    const visited = new Set(["A"]);
    const mst = [];

    while (visited.size < Object.keys(nodes).length) {
      let minEdge = null;

      for (let edge of edges) {
        const oneVisited =
          visited.has(edge.u) && !visited.has(edge.v);
        const otherVisited =
          visited.has(edge.v) && !visited.has(edge.u);

        if (oneVisited || otherVisited) {
          if (!minEdge || edge.w < minEdge.w) {
            minEdge = edge;
          }
        }
      }

      if (!minEdge) break; 

      mst.push(minEdge);

      if (!visited.has(minEdge.u)) visited.add(minEdge.u);
      if (!visited.has(minEdge.v)) visited.add(minEdge.v);
    }

    return mst;
  };
  const start = () => {
    const result = algo === "kruskal" ? kruskal() : prim();
    setSteps(result);
    setSelectedEdges([]);
    setStepIndex(0);
  };

  const nextStep = () => {
    if (stepIndex < steps.length) {
      setSelectedEdges(prev => [...prev, steps[stepIndex]]);
      setStepIndex(prev => prev + 1);
    }
  };
  return (
    <div className="container">
      <div className="top-controls">
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
        >
          <option value="kruskal">Kruskal</option>
          <option value="prim">Prim</option>
        </select>

        <div className="button-row">
          <button className="primary-btn" onClick={start}>
            Start
          </button>

          <button className="secondary-btn" onClick={nextStep}>
            Next
          </button>
        </div>
      </div>
      <div className="visual-area">
        <svg width="420" height="340">
          {edges.map((edge, i) => {
            const isSelected = selectedEdges.includes(edge);
            const midX = (nodes[edge.u].x + nodes[edge.v].x) / 2;
            const midY = (nodes[edge.u].y + nodes[edge.v].y) / 2;

            return (
              <g key={i}>
                <line
                  x1={nodes[edge.u].x}
                  y1={nodes[edge.u].y}
                  x2={nodes[edge.v].x}
                  y2={nodes[edge.v].y}
                  stroke={isSelected ? "#00ff88" : "#bbb"}
                  strokeWidth="3"
                  className={isSelected ? "glow" : ""}
                />

                <text
                  x={midX}
                  y={midY - 5}
                  textAnchor="middle"
                  className="weight-text"
                >
                  {edge.w}
                </text>
              </g>
            );
          })}

          {/* NODES */}
          {Object.keys(nodes).map(node => (
            <g key={node}>
              <circle
                cx={nodes[node].x}
                cy={nodes[node].y}
                r="22"
                fill="#4e73df"
              />
              <text
                x={nodes[node].x}
                y={nodes[node].y + 5}
                textAnchor="middle"
                fill="white"
                fontWeight="bold"
              >
                {node}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* INFO PANEL */}
      <div className="info-panel">
        <h3>
          {algo === "kruskal" ? "Kruskal's Algorithm" : "Prim's Algorithm"}
        </h3>

        <p>
          {algo === "kruskal"
            ? "Sort edges by weight and add smallest edges that do not create a cycle."
            : "Start from one node and repeatedly add the smallest connecting edge."}
        </p>

        <p><strong>Time Complexity:</strong> O(E log E)</p>
        <p><strong>Space Complexity:</strong> O(V)</p>
      </div>
    </div>
  );
}

export default MSTVisualizer;