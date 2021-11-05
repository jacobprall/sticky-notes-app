import Draggable from "react-draggable";
import { useState } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';

import './sticky-note.scss';

const StickyNote = ({ removeSticky, sticky, updateSticky }) => {
  
  // const [color, setColor] = useState('red');
  const [text, setText] = useState(sticky.stickyText);
  const [color, setColor] = useState(sticky.color);
  const { id, defaultPos } = sticky

  const handleColorChange = (color) => {
    setColor(color);
    updateSticky({ color, id });
  }

  const handleTextChange = (e, id) => {
    setText(e.target.value);
    updateSticky({ text: e.target.value, id });
  }

    return (
      <Draggable
        key={id}
        defaultPosition={defaultPos}
        onStop={(e, newPos) => {
          const { x, y } = newPos
          const pos = { x, y }
          updateSticky({ pos, id });
        }}
        handle='#handle'
      >

        <div className='sticky' style={color}>
          <div className="sticky__top">
            <button id="remove" onClick={() => removeSticky(id)}>
                X
            </button>
            <div id='handle'></div>
          </div>
          <div className="sticky__text">
            <textarea value={text} onChange={(e) => handleTextChange(e, id)} />
          </div>
          <ColorPicker color={color} handleColorChange={handleColorChange} />
        </div>
      </Draggable>
    );
};

export default StickyNote;