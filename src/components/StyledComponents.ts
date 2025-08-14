import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  box-sizing: border-box;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
    max-width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 ${props => props.theme.spacing.sm}; /* Reduced to sm for mobile */
    max-width: 100%;
    width: 100%;
  }
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacing['3xl']} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xl} 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg} 0;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-family: 'Orbitron', monospace;
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
  position: relative;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  animation: subtleGlow 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(15px);
    opacity: 0.3;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, #00d4ff 0%, #00ff88 50%, #8b45ff 100%);
    border-radius: ${props => props.theme.borderRadius.full};
    box-shadow: 
      0 0 15px rgba(0, 212, 255, 0.6),
      0 0 30px rgba(0, 212, 255, 0.3);
    background-size: 200% 100%;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    animation: gradient-shift 3s ease-in-out infinite;
  }
  
  &.in-view::after {
    width: 120px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
    margin-bottom: ${props => props.theme.spacing.xl};
    
    &::before {
      filter: blur(10px);
    }
    
    &.in-view::after {
      width: 80px;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin-bottom: ${props => props.theme.spacing.lg};
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
    
    &::before {
      filter: blur(8px);
    }
    
    &.in-view::after {
      width: 60px;
      height: 3px;
    }
  }
`;

export const SectionSubtitle = styled(motion.p)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  line-height: 1.7;
  font-weight: 400;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.base};
    margin-bottom: ${props => props.theme.spacing.lg};
    max-width: 600px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: ${props => props.theme.spacing.md};
    max-width: 100%;
    line-height: 1.6;
  }
`;

export const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.medium};
  font-family: 'Space Grotesk', sans-serif;
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="%2300d4ff" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="%2300d4ff"/></svg>') 12 12, pointer;
  transition: all ${props => props.theme.transitions.normal};
  border: 2px solid transparent;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.sm};
    gap: ${props => props.theme.spacing.xs};
    width: 100%; /* Full width within container */
    max-width: 300px; /* Reasonable max width */
    margin: 0 auto; /* Center the button */
    justify-content: center;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: linear-gradient(135deg, #8b45ff, #ff6b6b);
          color: ${props.theme.colors.text};
          box-shadow: 0 0 20px rgba(139, 69, 255, 0.3);
          
          &:hover {
            background: linear-gradient(135deg, #a855f7, #ff8787);
            transform: translateY(-3px);
            box-shadow: 0 0 30px rgba(139, 69, 255, 0.6), 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #00d4ff;
          border-color: #00d4ff;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
          
          &:hover {
            background: linear-gradient(135deg, #00d4ff, #00ff88);
            color: #0a0a0a;
            transform: translateY(-3px);
            box-shadow: 0 0 25px rgba(0, 212, 255, 0.5), 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #00d4ff, #00ff88);
          color: #0a0a0a;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
          
          &:hover {
            background: linear-gradient(135deg, #00ff88, #00d4ff);
            transform: translateY(-3px);
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.6), 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        `;
    }
  }}
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const Card = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.9) 100%);
  backdrop-filter: blur(25px);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  border: 1px solid rgba(0, 212, 255, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  animation: gentleFloat 8s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(0, 212, 255, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 
      0 0 50px rgba(0, 212, 255, 0.5),
      0 25px 50px rgba(0, 0, 0, 0.4),
      inset 0 0 30px rgba(0, 212, 255, 0.15);
    border-color: rgba(0, 212, 255, 0.6);
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(22, 33, 62, 0.95) 100%);
    animation-play-state: paused;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-8px) scale(1.01);
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: ${props => props.gap || props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Tag = styled.span`
  background: ${props => props.theme.colors.accent}20;
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export const IconWrapper = styled.div<{ size?: string; color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  color: ${props => props.color || '#00d4ff'};
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px currentColor);
  }
`;

export const SkillBar = styled.div<{ level: number }>`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.xs};
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.level}%;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    transition: width 1s ease-in-out;
  }
`;
