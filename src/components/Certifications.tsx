import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import { certifications } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle, Card, Grid, Button, IconWrapper } from './StyledComponents';

const CertificationsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const CertificationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    border-radius: 0 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md};
  }
`;

const AwardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.background};
  font-size: ${props => props.theme.fontSizes.xl};
  margin: ${props => props.theme.spacing.lg} auto ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.glow};
`;

const CertificationTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.4;
`;

const CertificationIssuer = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.accent};
  font-weight: ${props => props.theme.fontWeights.medium};
  margin: 0;
`;

const CertificationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin: ${props => props.theme.spacing.md} 0;
  padding: ${props => props.theme.spacing.sm} 0;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const CertificationDate = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const CredentialId = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-family: ${props => props.theme.fonts.mono};
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
`;

const ViewButton = styled(Button)`
  margin-top: auto;
  font-size: ${props => props.theme.fontSizes.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
`;

const Certifications: React.FC = () => {
  return (
    <Section id="certifications">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Certifications & Achievements
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Continuously learning and validating expertise through recognized industry certifications and academic achievements.
        </SectionSubtitle>

        <CertificationsGrid>
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
          <CertificationCard whileHover={{ y: -5, scale: 1.02 }}>
            <AwardIcon>
              {React.createElement(FaAward)}
            </AwardIcon>                <CertificationTitle>{cert.title}</CertificationTitle>
                
                <CertificationIssuer>{cert.issuer}</CertificationIssuer>
                
                <CertificationMeta>
                  <CertificationDate>{cert.date}</CertificationDate>
                  <CredentialId>{cert.credentialId}</CredentialId>
                </CertificationMeta>
                
                <ViewButton
                  as="a"
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper>
                    {React.createElement(FaExternalLinkAlt)}
                  </IconWrapper>
                  View Certificate
                </ViewButton>
              </CertificationCard>
            </motion.div>
          ))}
        </CertificationsGrid>
      </Container>
    </Section>
  );
};

export default Certifications;
