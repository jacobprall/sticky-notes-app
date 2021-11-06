import React, { useState, useEffect } from "react";
import "./App.scss";
import { v4 as uuidv4 } from "uuid";
import StickyNote from './components/StickyNote/StickyNote'
import ContextMenu from "./components/ContextMenu/ContextMenu";
import Canvas from "./components/Canvas/Canvas";
import ClearCanvasButton from "./components/Canvas/CanvasClear";

const defaultColorHex = "#F3E779"

function App() {

  const readHash = () => {
    try {
      if (window.location.hash.length > 1) {
        localStorage.setItem('stickies', JSON.stringify([]))
        const escapedJson = window.location.hash.slice(1);
        const jsonString = decodeURIComponent(escapedJson);
        const urlStickies = JSON.parse(jsonString);
        setStickies(urlStickies);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getLink = () => {
    const json = localStorage.getItem("stickies");
    const hash = encodeURIComponent(json);
    setEncodedUrl(() => `${window.location.origin}#${hash}`);
    const copyText = document.getElementById('link-copy');
    copyText.select();
    document.execCommand("copy");
  }


  useEffect(() => {
    readHash();
  }, []);


  const [stickies, setStickies] = useState(
     JSON.parse(localStorage.getItem("stickies")) || []
  );

  const [canvasActive, setCanvasActive] = useState(false);

  const [encodedUrl, setEncodedUrl] = useState('');

  const newSticky = (x = 100, y = 0) => {
    const newStickyNote = {
      id: uuidv4(),
      stickyText: "",
      defaultPos: { x: parseInt(x) - 200, y: parseInt(y) + 100 },
      color: { background: defaultColorHex },
      lastUpdated: (new Date()).toString()
    };
    setStickies((stickies) => [...stickies, newStickyNote]);
  };

  const handleNewSticky = (x, y) => {
    newSticky(x, y);
  }

  useEffect(() => {
    localStorage.setItem("stickies", JSON.stringify(stickies));
  }, [stickies]);

  useEffect(() => {
    const copyButton = document.getElementById('link-copy-button');
    copyButton.addEventListener('click', getLink);
  }, []);

  const updateSticky = ({ pos, color, text, id }) => {
    const updatedStickies = [...stickies].map((sticky) => {
      if (sticky.id === id) {
        if (pos) {
          sticky.defaultPos = { x: pos.x, y: pos.y };
        }
        if (color) {
          sticky.color = color;
        }
        if (text) {
          sticky.stickyText = text;
        }
        sticky.lastUpdated = (new Date()).toString();
        return sticky;
      } else {
        return sticky;
      }
    });
    setStickies(updatedStickies);
    window.history.replaceState(null, null, ' ');
  }

  const clearStickies = () => {
    setStickies([]);
    localStorage.setItem('stickies', JSON.stringify([]));
  }

  const removeSticky = (id) => {
    setStickies(stickies.filter((sticky) => sticky.id !== id));
  };

  return (
      <div className="App">
        <div className="App__container" id="app-container">
          <label class="switch">
            <input class="switch-input" type="checkbox" />
            <span class="switch-label" data-on="Draw" data-off="Sticky" onClick={() => setCanvasActive((prev) => !prev)}></span> 
            <span class="switch-handle"></span> 
          </label>
          <Canvas active={canvasActive} />
          <ContextMenu handleNewSticky={handleNewSticky} active={!canvasActive}/>
          {stickies.map((sticky) => {
            return (
              <StickyNote sticky={sticky} updateSticky={updateSticky} removeSticky={removeSticky}  />
            );
          })}
        </div>
        <div className="clear-buttons">
          <button onClick={() => clearStickies()}>
            Clear Stickies
          </button>
          <ClearCanvasButton />
          <button id="link-copy-button">Get Link</button>
          <input id="link-copy" style={{ background: 'none', border: 'none', opacity: 0 }} defaultValue={encodedUrl} />
        </div>
      </div>
  );
}

export default App;