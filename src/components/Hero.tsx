import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { Container, Button, IconWrapper } from './StyledComponents';

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
`;

const digitalPulse = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: 
    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%),
    radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${props => props.theme.spacing['3xl']};
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${props => props.theme.spacing.xl};
    min-height: auto;
    padding: ${props => props.theme.spacing['2xl']} 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.xl} 0;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    order: 2;
  }
`;

const HeroImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    order: 1;
  }
`;

const ProfileImage = styled(motion.div)`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #00ff88, #8b45ff);
  background-size: 200% 200%;
  padding: 6px;
  position: relative;
  animation: gradient-shift 8s ease infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: -30px;
    border-radius: 50%;
    background: 
      conic-gradient(from 0deg, #00d4ff, #00ff88, #8b45ff, #00d4ff),
      radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
    background-size: 200% 200%;
    filter: blur(20px);
    opacity: 0.8;
    z-index: -1;
    animation: gradient-shift 10s ease infinite reverse, ${digitalPulse} 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d4ff, #00ff88);
    z-index: -1;
    opacity: 0.8;
  }
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    background: #1a1a2e;
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 250px;
    height: 250px;
  }
`;

const Greeting = styled(motion.p)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes.lg};
  color: #00d4ff;
  font-weight: 500;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
`;

const Name = styled(motion.h1)`
  font-family: 'Orbitron', monospace;
  font-size: ${props => props.theme.fontSizes['6xl']};
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #8b45ff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1.1;
  animation: gradient-shift 4s ease infinite;
  position: relative;
  word-break: break-word;
  text-align: left;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(20px);
    opacity: 0.3;
    z-index: -1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    text-align: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes['4xl']};
    line-height: 1.2;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes['3xl']};
  }
`;

const Title = styled(motion.h2)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: #e0e0e0;
  font-weight: 600;
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  line-height: 1.4;
  letter-spacing: 0.5px;
  text-align: left;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    text-align: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.xl};
    line-height: 1.5;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const Tagline = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: ${props => props.theme.fontSizes.xl};
  color: #00d4ff;
  font-weight: 500;
  margin: ${props => props.theme.spacing.lg} 0;
  background: rgba(0, 212, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #00d4ff;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
  text-align: left;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    text-align: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.lg};
    padding: 0.75rem 1rem;
    margin: ${props => props.theme.spacing.md} 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.base};
    padding: 0.5rem 0.75rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 255, 136, 0.08) 100%);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 16px;
  padding: 1.25rem 1rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 255, 136, 0.15) 100%);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.4),
      0 8px 25px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 212, 255, 0.5);
    
    &::before {
      left: 100%;
    }
  }
`;

const StatNumber = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #8b45ff 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  position: relative;
  animation: gradient-shift 3s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(10px);
    opacity: 0.3;
    z-index: -1;
  }
`;

const StatLabel = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #b0b0b0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.xl};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const TypingText = styled.span`
  color: ${props => props.theme.colors.accent};
  border-right: 2px solid ${props => props.theme.colors.accent};
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { border-color: transparent; }
    51%, 100% { border-color: ${props => props.theme.colors.accent}; }
  }
`;

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = personalInfo.title;

  useEffect(() => {
    let index = 0;
    const typingSpeed = 100;
    
    const typeText = () => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };
    
    const timer = setTimeout(typeText, 1000);
    return () => clearTimeout(timer);
  }, [fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <HeroSection id="home">
      <HeroContainer>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Greeting variants={itemVariants}>
              Hello, I'm
            </Greeting>
            
            <Name variants={itemVariants}>
              {personalInfo.name}
            </Name>
            
            <Title variants={itemVariants}>
              {displayedText}
              {isTyping && <TypingText>|</TypingText>}
            </Title>
            
            <Tagline variants={itemVariants}>
              "{personalInfo.tagline}"
            </Tagline>
            
            <ButtonGroup variants={itemVariants}>
              <Button
                as="a"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconWrapper>
                  {React.createElement(FaDownload)}
                </IconWrapper>
                Download Resume
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconWrapper>
                  {React.createElement(FaEye)}
                </IconWrapper>
                View Projects
              </Button>
            </ButtonGroup>

            <StatsContainer variants={itemVariants}>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatNumber>5+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatNumber>50+</StatNumber>
                <StatLabel>Projects Completed</StatLabel>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatNumber>15+</StatNumber>
                <StatLabel>Technologies</StatLabel>
              </StatCard>
            </StatsContainer>
            
            <SocialLinks variants={itemVariants}>
              <SocialLink
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {React.createElement(FaLinkedin)}
              </SocialLink>
              
              <SocialLink
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {React.createElement(FaGithub)}
              </SocialLink>
              
              <SocialLink
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {React.createElement(FaTwitter)}
              </SocialLink>
            </SocialLinks>
          </motion.div>
        </HeroContent>
        
        <HeroImageContainer>
          <ProfileImage
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={personalInfo.profileImage} alt={personalInfo.name} />
          </ProfileImage>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
