import useContextMenu from '../../hooks/useContextMenu';
import { Motion, spring } from 'react-motion';
import './context-menu.scss';

const ContextMenu = ({ handleNewSticky }) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  return (
    <Motion
      defaultStyle={{ opacity: 0 }}
      style={{ opacity: !showMenu ? spring(0) : spring(1) }}
      
    >
      {(interpolatedStyle) => (
        <>
          {showMenu ? (
            <div
              className='context-menu'
              style={{
                top: yPos,
                left: xPos,
                opacity: interpolatedStyle.opacity,
              }}
            >
                <a href="#" onClick={() => handleNewSticky(xPos, yPos)}>Create new sticky</a>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </Motion>
  );
};

export default ContextMenu;