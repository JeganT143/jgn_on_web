import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle } from './StyledComponents';

const AboutContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const AboutText = styled(motion.p)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes.lg};
  color: #e0e0e0;
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-weight: 400;
  letter-spacing: 0.3px;
  position: relative;
  padding: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.4) 0%, rgba(22, 33, 62, 0.3) 100%);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid rgba(0, 212, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, #00d4ff, #00ff88);
    border-radius: 0 2px 2px 0;
  }
  
  &::first-letter {
    font-size: 1.5em;
    font-weight: 700;
    background: linear-gradient(135deg, #00d4ff, #00ff88);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1));
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  text-align: center;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
    border-color: rgba(0, 212, 255, 0.5);
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(0, 255, 136, 0.15));
  }
`;

const HighlightText = styled.h3`
  font-family: 'JetBrains Mono', monospace;
  font-size: ${props => props.theme.fontSizes.lg};
  color: #00d4ff;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
`;

const About: React.FC = () => {
  return (
    <Section id="about">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          About Me
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Passionate about transforming complex data into actionable insights and building AI solutions that make a real impact.
        </SectionSubtitle>

        <AboutContainer>
          <AboutContent>
            {aboutMe.summary.map((paragraph, index) => (
              <AboutText
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {paragraph}
              </AboutText>
            ))}
          </AboutContent>

          <div>
            <HighlightsGrid>
              {aboutMe.highlights.map((highlight, index) => (
                <HighlightCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <HighlightText>{highlight}</HighlightText>
                </HighlightCard>
              ))}
            </HighlightsGrid>
          </div>
        </AboutContainer>
      </Container>
    </Section>
  );
};

export default About;
