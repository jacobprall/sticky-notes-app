import Draggable from "react-draggable";
import { useState } from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import classNames from 'classnames';

import './sticky-note.scss';

const StickyNote = ({ updatePos, removeSticky, sticky, i, updateColor, updateStickyText }) => {
  
  // const [color, setColor] = useState('red');
  const [text, setText] = useState(sticky.stickyText);
  const [color, setColor] = useState(sticky.color);
  const handleColorChange = (color) => {
    setColor(color);
    updateColor(color, sticky.id);
  }

  const handleTextChange = (e, id) => {
    setText(e.target.value);
    updateStickyText(e.target.value, id);
  }

    return (
      <Draggable
        key={sticky.id}
        defaultPosition={sticky.defaultPos}
        onStop={(e, pos) => {
          updatePos(pos, i);
        }}
        handle='#handle'
      >

        <div className='sticky' style={color}>
          <div className="sticky__top">
            <button id="remove" onClick={() => removeSticky(sticky.id)}>
                X
            </button>
            <div id='handle'></div>
          </div>
          <div className="sticky__text">
            <textarea value={text} onChange={(e) => handleTextChange(e, sticky.id)} />
          </div>
          <ColorPicker color={color} handleColorChange={handleColorChange} />
        </div>
      </Draggable>
    );
};

export default StickyNote;