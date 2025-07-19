import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const digitalMatrix = keyframes`
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.8;
  }
`;

const binaryFlow = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const circuitPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(0, 212, 255, 0.2),
      0 0 40px rgba(0, 212, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.4),
      0 0 60px rgba(0, 212, 255, 0.2),
      0 0 90px rgba(0, 212, 255, 0.1);
  }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%),
    radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(0, 255, 136, 0.08) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  overflow: hidden;
  animation: ${circuitPulse} 4s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px),
      linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: ${digitalMatrix} 3s ease-in-out infinite;
    opacity: 0.3;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 212, 255, 0.8),
      rgba(0, 255, 136, 0.8),
      transparent
    );
    animation: ${binaryFlow} 2s ease-in-out infinite;
  }
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #8b45ff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 2s ease-in-out infinite, ${gradientShift} 3s ease infinite;
  text-shadow: 0 0 40px rgba(0, 212, 255, 0.3);
  letter-spacing: 0.2em;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(20px);
    opacity: 0.4;
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const Dot = styled.div<{ delay: number }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #00ff88);
  animation: ${pulse} 1.8s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    animation: ${pulse} 1.8s ease-in-out infinite reverse;
    animation-delay: ${props => props.delay}s;
  }
`;

const LoadingText = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.4rem;
  color: #b0b0b0;
  letter-spacing: 0.3em;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    letter-spacing: 0.2em;
  }
`;

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <LoaderContainer
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <LoaderContent>
            <Logo>JT</Logo>
            <LoadingDots>
              <Dot delay={0} />
              <Dot delay={0.3} />
              <Dot delay={0.6} />
            </LoadingDots>
            <LoadingText>Portfolio</LoadingText>
          </LoaderContent>
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
