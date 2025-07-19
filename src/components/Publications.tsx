import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaQuoteLeft } from 'react-icons/fa';
import { publications } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle, Card, Grid, Button, IconWrapper } from './StyledComponents';

const PublicationsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

const PublicationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    border-radius: ${props => props.theme.borderRadius.xl} ${props => props.theme.borderRadius.xl} 0 0;
  }
`;

const QuoteIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.accent}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PublicationTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.4;
`;

const PublicationJournal = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.accent};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin: 0;
`;

const PublicationAuthors = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  font-style: italic;
`;

const PublicationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const PublicationYear = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const CitationsCount = styled.span`
  background: ${props => props.theme.colors.accentTertiary}20;
  color: ${props => props.theme.colors.accentTertiary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ReadButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.sm};
  align-self: flex-start;
  font-size: ${props => props.theme.fontSizes.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
`;

const Publications: React.FC = () => {
  return (
    <Section id="publications">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Research & Publications
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Contributing to the advancement of AI through research and sharing knowledge with the scientific community.
        </SectionSubtitle>

        <PublicationsGrid>
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PublicationCard whileHover={{ y: -5 }}>
                <QuoteIcon>
                  {React.createElement(FaQuoteLeft)}
                </QuoteIcon>
                
                <PublicationTitle>{publication.title}</PublicationTitle>
                
                <PublicationJournal>{publication.journal}</PublicationJournal>
                
                <PublicationAuthors>{publication.authors}</PublicationAuthors>
                
                <PublicationMeta>
                  <PublicationYear>{publication.year}</PublicationYear>
                  <CitationsCount>{publication.citations} citations</CitationsCount>
                </PublicationMeta>
                
                <ReadButton
                  as="a"
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper>
                    {React.createElement(FaExternalLinkAlt)}
                  </IconWrapper>
                  Read Paper
                </ReadButton>
              </PublicationCard>
            </motion.div>
          ))}
        </PublicationsGrid>
      </Container>
    </Section>
  );
};

export default Publications;
