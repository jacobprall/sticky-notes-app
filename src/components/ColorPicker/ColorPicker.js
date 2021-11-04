import { useState } from "react";
import { TwitterPicker } from 'react-color'
import './color-picker.scss'

const ColorPicker = ({ color, handleColorChange }) => {
  const [active, setActive] = useState(false);

  const handleChangeComplete = (color) => {
    handleColorChange({ background: color.hex })
  }

  return (
    <div className='color-picker'  onClick={() => setActive((prev) => !prev)}>
      {
        !active && <div className="color-picker__inner" style={color}></div>
      }
      {
        active &&  <TwitterPicker className="color-picker__menu" onChangeComplete={handleChangeComplete} />
      }
    </div>
  )
}

export default ColorPicker;