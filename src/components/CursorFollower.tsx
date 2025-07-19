import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CursorPointer = styled.div<{ x: number; y: number; isClicking: boolean }>`
  position: fixed;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  width: 24px;
  height: 24px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%) ${props => props.isClicking ? 'scale(0.8)' : 'scale(1)'};
  transition: transform 0.1s ease-out;
  font-size: 20px;
  
  &::before {
    content: '👆';
    display: block;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
  }
`;

const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return <CursorPointer x={mousePosition.x} y={mousePosition.y} isClicking={isClicking} />;
};

export default CursorFollower;
