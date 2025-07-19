import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle, Card, Button, IconWrapper } from './StyledComponents';

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: start;
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const ContactCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ContactIcon = styled(IconWrapper)`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.accent}20;
  border-radius: 50%;
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h4`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 4px 0;
`;

const ContactValue = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

const FormCard = styled(Card)``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const FormLabel = styled.label`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`;

const FormInput = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const FormTextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.base};
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const SubmitButton = styled(Button)<{ isSubmitting: boolean; isSubmitted: boolean }>`
  align-self: flex-start;
  opacity: ${props => props.isSubmitting ? 0.7 : 1};
  pointer-events: ${props => props.isSubmitting ? 'none' : 'auto'};
  background: ${props => props.isSubmitted ? props.theme.colors.accentTertiary : props.theme.colors.accent};
  
  &:hover {
    background: ${props => props.isSubmitted ? props.theme.colors.accentTertiary : props.theme.colors.accentHover};
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${props => props.theme.colors.accentTertiary}20;
  color: ${props => props.theme.colors.accentTertiary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.accentTertiary}40;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Section id="contact">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Let's Work Together
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to bring your AI ideas to life? Let's discuss how we can create innovative solutions together.
        </SectionSubtitle>

        <ContactContainer>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactInfo>
              <ContactCard>
                <ContactDetails>
                  <ContactItem>
                    <ContactIcon>
                      {React.createElement(FaEnvelope)}
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue>{personalInfo.email}</ContactValue>
                    </ContactText>
                  </ContactItem>
                  
                  <ContactItem>
                    <ContactIcon>
                      {React.createElement(FaUser)}
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Location</ContactLabel>
                      <ContactValue>{personalInfo.location}</ContactValue>
                    </ContactText>
                  </ContactItem>
                </ContactDetails>
              </ContactCard>
            </ContactInfo>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FormCard>
              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {React.createElement(FaCheckCircle)}
                  Message sent successfully! I'll get back to you soon.
                </SuccessMessage>
              )}
              
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="name">Name *</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="email">Email *</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="message">Message *</FormLabel>
                  <FormTextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or how we can collaborate..."
                    required
                  />
                </FormGroup>
                
                <SubmitButton
                  type="submit"
                  isSubmitting={isSubmitting}
                  isSubmitted={isSubmitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper>
                    {isSubmitted ? React.createElement(FaCheckCircle) : React.createElement(FaPaperPlane)}
                  </IconWrapper>
                  {isSubmitting ? 'Sending...' : isSubmitted ? 'Sent!' : 'Send Message'}
                </SubmitButton>
              </Form>
            </FormCard>
          </motion.div>
        </ContactContainer>
      </Container>
    </Section>
  );
};

export default Contact;
