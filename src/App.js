import React, { useState } from "react";
import Navbar from "./components/NavBar";
import SortingVisualizer from "./components/SortingVisualizer";
import StackVisualizer from "./components/StackVisualizer";
import QueueVisualizer from "./components/QueueVisualizer";
import BinaryTreeVisualizer from "./components/BinaryTreeVisualizer";
import MSTVisualizer from "./components/MSTVisualizer";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState("sorting");

  const renderComponent = () => {
    switch (activeView) {
      case "sorting":
        return <SortingVisualizer darkMode={darkMode} />;
      case "stack":
        return <StackVisualizer />;
      case "queue":
        return <QueueVisualizer />;
      case "binaryTree":
        return <BinaryTreeVisualizer />;
      case "mst":
        return <MSTVisualizer />;
      default:
        return <SortingVisualizer darkMode={darkMode} />;
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {renderComponent()}
    </div>
  );
}

export default App;