import Draggable from "react-draggable";
import { useState } from 'react';
// import ColorPicker from '../ColorPicker/ColorPicker';
import classNames from 'classnames';

const StickyNote = ({ updatePos, removeSticky, sticky, i }) => {
  
  // const [color, setColor] = useState('red');
  const [text, setText] = useState('');

  const stickyClassName = classNames(`sticky--${'color'}`, 'sticky');
    return (
      <Draggable
        key={sticky.id}
        defaultPosition={sticky.defaultPos}
        onStop={(e, pos) => {
          updatePos(pos, i);
        }}
        handle='#handle'
      >
        {/* <ColorPicker setColor={setColor} color={color} /> */}
        <div className={stickyClassName}>
        <button id="remove" onClick={(e) => removeSticky(sticky.id)}>
            X
        </button>
        <p id='handle'>...</p>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </Draggable>
    );
};

export default StickyNote;