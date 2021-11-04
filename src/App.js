import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import StickyNote from './components/StickyNote/StickyNote'
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Canvas from "./components/Canvas/Canvas";
const defaultColorHex = '#F3E779 '

function App() {
  const [stickies, setStickies] = useState(
    JSON.parse(localStorage.getItem("stickies")) || []
  );

  const [toggle, setToggle] = useState(false);

  const newSticky = (x = 100, y = 0) => {
      const newStickyNote = {
        id: uuidv4(),
        stickyText: "",
        defaultPos: { x: parseInt(x) - 200, y: parseInt(y) - 200 },
        color: { background: defaultColorHex }
      };
      setStickies((stickies) => [...stickies, newStickyNote]);
  };

  const handleNewSticky = (x, y) => {
    newSticky(x, y);
  }

  useEffect(() => {
    localStorage.setItem("stickies", JSON.stringify(stickies));
  }, [stickies]);

  const updatePos = (pos, index) => {
    let newStickies = [...stickies];
    newStickies[index].defaultPos = { x: pos.x, y: pos.y };
    setStickies(newStickies);
  };

  const updateColor = (color, id) => {
    let newStickies = [...stickies];
    newStickies.map((sticky) => {
      if (sticky.id === id) {
        return sticky.color = color;
      } else {
        return sticky;
      }
    });
    setStickies(newStickies);
  }

  const removeSticky = (id) => {
    setStickies(stickies.filter((sticky) => sticky.id !== id));
  };

  return (
      <div className="App">
        <div className="App__container">
          <label class="switch">
            <input class="switch-input" type="checkbox" />
            <span class="switch-label" data-on="Draw" data-off="Sticky" onClick={() => setToggle((prev) => !prev)}></span> 
            <span class="switch-handle"></span> 
          </label>
          {
            toggle && <Canvas />
          }
          <ContextMenu handleNewSticky={handleNewSticky} />
          {stickies.map((sticky, i) => {
            return (
              <StickyNote sticky={sticky} updateColor={updateColor} removeSticky={removeSticky} updatePos={updatePos} i={i} />
            );
          })}
        </div>
      </div>
  );
}

export default App;