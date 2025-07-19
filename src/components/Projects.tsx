import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import { projects } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle, Card, Grid, Button, Tag, IconWrapper } from './StyledComponents';

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ active: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.full};
  border: 2px solid ${props => props.active ? props.theme.colors.accent : props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    color: ${props => props.active ? props.theme.colors.background : props.theme.colors.accent};
  }
`;

const ProjectsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectsScrollContainer = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 1rem;
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #00d4ff, #00ff88);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #00b8e6, #00e676);
  }
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ProjectImage = styled.div<{ image: string }>`
  width: 100%;
  height: 200px;
  background: url(${props => props.image}) center/cover;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, ${props => props.theme.colors.accent}20, ${props => props.theme.colors.accentSecondary}20);
    opacity: 0;
    transition: opacity ${props => props.theme.transitions.normal};
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const ProjectTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.3;
`;

const FeaturedBadge = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
  color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProjectDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: ${props => props.theme.spacing.sm} 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin: ${props => props.theme.spacing.sm} 0;
`;

const Metrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin: ${props => props.theme.spacing.sm} 0;
`;

const MetricTag = styled(Tag)`
  background: ${props => props.theme.colors.accentTertiary}20;
  color: ${props => props.theme.colors.accentTertiary};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const ProjectActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: auto;
  padding-top: ${props => props.theme.spacing.md};
`;

const ActionButton = styled(Button)`
  flex: 1;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
`;

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'AI', 'ML', 'CV', 'NLP', 'Data'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <Section id="projects">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Featured Projects
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Showcasing real-world applications of AI and machine learning that solve meaningful problems and create value.
        </SectionSubtitle>

        <ProjectsContainer>
          <FilterContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  active={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper>
                    {React.createElement(FaFilter)}
                  </IconWrapper>
                  {category}
                </FilterButton>
              ))}
            </motion.div>
          </FilterContainer>

          <ProjectsScrollContainer>
            <ProjectsGrid>
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard whileHover={{ y: -10 }}>
                    <ProjectImage image={project.image} />
                    
                    <ProjectContent>
                      <ProjectHeader>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
                      </ProjectHeader>
                      
                      <ProjectDescription>{project.description}</ProjectDescription>
                      
                      <TechStack>
                        {project.techStack.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </TechStack>
                      
                      <Metrics>
                        {project.metrics.map((metric, metricIndex) => (
                          <MetricTag key={metricIndex}>{metric}</MetricTag>
                        ))}
                      </Metrics>
                      
                      <ProjectActions>
                        <ActionButton
                          as="a"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconWrapper>
                            {React.createElement(FaGithub)}
                          </IconWrapper>
                          Code
                        </ActionButton>
                        
                        <ActionButton
                          as="a"
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconWrapper>
                            {React.createElement(FaExternalLinkAlt)}
                          </IconWrapper>
                          Demo
                        </ActionButton>
                      </ProjectActions>
                    </ProjectContent>
                  </ProjectCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
          </ProjectsScrollContainer>
        </ProjectsContainer>
      </Container>
    </Section>
  );
};

export default Projects;
