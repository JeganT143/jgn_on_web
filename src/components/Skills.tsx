import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle, Card, Grid, IconWrapper } from './StyledComponents';

const SkillsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(Card)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  transition: all 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.color || '#00d4ff'}, #00ff88);
    box-shadow: 0 0 10px ${props => props.color || '#00d4ff'};
  }

  &::after {
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
    transform: translateY(-8px);
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.4),
      0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 212, 255, 0.5);
    
    &::after {
      opacity: 1;
    }
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SkillIcon = styled(IconWrapper)<{ color: string }>`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.color}30, ${props => props.color}10);
  border: 2px solid ${props => props.color}40;
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.color};
  font-size: ${props => props.theme.fontSizes.xl};
  box-shadow: 0 0 20px ${props => props.color}30;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 30px ${props => props.color}60;
    transform: scale(1.1);
  }
`;

const SkillTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
`;

const TechnologiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const TechnologyChip = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 255, 136, 0.2));
    border-color: rgba(0, 212, 255, 0.4);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const TechIcon = styled(IconWrapper)`
  width: 20px;
  height: 20px;
  color: #00d4ff;
  font-size: 16px;
  flex-shrink: 0;
`;

const TechName = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Skills: React.FC = () => {
  return (
    <Section id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Skills & Technologies
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A comprehensive toolkit for building intelligent systems and solving complex problems.
        </SectionSubtitle>

        <SkillsGrid>
          {skills.map((skillCategory, categoryIndex) => (
            <SkillCard
              key={skillCategory.category}
              color={skillCategory.color}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <SkillHeader>
                <SkillIcon color={skillCategory.color}>
                  {React.createElement(skillCategory.icon)}
                </SkillIcon>
                <SkillTitle>{skillCategory.category}</SkillTitle>
              </SkillHeader>

              <TechnologiesGrid>
                {skillCategory.technologies.map((tech, techIndex) => (
                  <TechnologyChip
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: (categoryIndex * 0.1) + (techIndex * 0.05),
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TechIcon>
                      {React.createElement(tech.icon)}
                    </TechIcon>
                    <TechName>{tech.name}</TechName>
                  </TechnologyChip>
                ))}
              </TechnologiesGrid>
            </SkillCard>
          ))}
        </SkillsGrid>
      </Container>
    </Section>
  );
};

export default Skills;
