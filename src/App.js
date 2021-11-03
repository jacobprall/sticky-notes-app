import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import StickyNote from './components/StickyNote/StickyNote'

function App() {
  const [stickies, setStickies] = useState(
    JSON.parse(localStorage.getItem("stickies")) || []
  );

  const newSticky = () => {
      const newStickyNote = {
        id: uuidv4(),
        stickyText: "",
        defaultPos: { x: 100, y: 0 },
      };
      setStickies((stickies) => [...stickies, newStickyNote]);
  };

  const handleNewSticky = (e) => {
    e.preventDefault();
    newSticky();
  }

  useEffect(() => {
    localStorage.setItem("stickies", JSON.stringify(stickies));
  }, [stickies]);

  const updatePos = (pos, index) => {
    let newStickies = [...stickies];
    newStickies[index].defaultPos = { x: pos.x, y: pos.y };
    setStickies(newStickies);
  };

  const removeSticky = (id) => {
    setStickies(stickies.filter((sticky) => sticky.id !== id));
  };

  return (
    <div className="App">
      <div id="new-sticky">
        <button onClick={(e) => handleNewSticky(e)}>+</button>
      </div>
      {stickies.map((sticky, i) => {
        return (
          <StickyNote sticky={sticky} removeSticky={removeSticky} updatePos={updatePos} i={i} />
        );
      })}
    </div>
  );
}

export default App;