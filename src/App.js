import React, { useState, useEffect } from "react";
import "./App.css";
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
        const escapedJson = window.location.hash.slice(1);
        const jsonString = decodeURIComponent(escapedJson);
        const parsedJsonUrl = JSON.parse(jsonString);
        const oldStickies = JSON.parse(localStorage.getItem('stickies'));
        if (oldStickies) {
          const updatedStickies = oldStickies.map((sticky) => {
            const urlSticky = parsedJsonUrl.find(({ id }) => id === sticky.id)
            if (urlSticky) {
              if (new Date(urlSticky.lastUpdated) < new Date(sticky.lastUpdated)) {
                return urlSticky;
              } else {
                return sticky;
              }
            } else {
              return sticky;
            }
          });
          parsedJsonUrl.forEach((sticky) => {
            if (!updatedStickies.find((updatedSticky) => updatedSticky.id === sticky.id)) {
              console.log('hit')
              updatedStickies.push(sticky)
            };
          });
          
          localStorage.setItem('stickies', JSON.stringify(updatedStickies));
        }
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

  readHash();

  const [stickies, setStickies] = useState(
     JSON.parse(localStorage.getItem("stickies")) || []
  );

  const [canvasActive, setCanvasActive] = useState(false);

  const [encodedUrl, setEncodedUrl] = useState('');

  const newSticky = (x = 100, y = 0) => {
      const newStickyNote = {
        id: uuidv4(),
        stickyText: "",
        defaultPos: { x: parseInt(x) - 200, y: parseInt(y) - 200 },
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
  }, [])

  const updatePos = (pos, index) => {
    let newStickies = [...stickies];
    newStickies[index].defaultPos = { x: pos.x, y: pos.y };
    newStickies[index].lastUpdated = (new Date()).toString();
    setStickies(newStickies);
  };

  const updateColor = (color, id) => {
    let newStickies = [...stickies];
    newStickies.map((sticky) => {
      if (sticky.id === id) {
        sticky.color = color;
        sticky.lastUpdated = (new Date()).toString();
        return sticky;
      } else {
        return sticky;
      }
    });
    setStickies(newStickies);
  }

  const updateStickyText = (text, id) => {
    let newStickies = [...stickies];
    newStickies.map((sticky) => {
      if (sticky.id === id) {
        sticky.stickyText = text;
        sticky.lastUpdated = (new Date()).toString();
        return sticky;
      } else {
        return sticky;
      }
    })
    setStickies(newStickies);
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
          {stickies.map((sticky, i) => {
            return (
              <StickyNote sticky={sticky} updateColor={updateColor} removeSticky={removeSticky} updatePos={updatePos} updateStickyText={updateStickyText} i={i} />
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