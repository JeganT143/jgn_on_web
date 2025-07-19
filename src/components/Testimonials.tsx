import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { testimonials } from '../data/portfolioData';
import { Container, Section, SectionTitle, SectionSubtitle, Card, Grid, IconWrapper } from './StyledComponents';

const TestimonialsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

const TestimonialCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    border-radius: 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0;
  }
`;

const QuoteIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.accent}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const TestimonialText = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  font-style: italic;
  margin: 0;
  flex: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const AuthorImage = styled.div<{ image: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${props => props.image}) center/cover;
  background-color: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.accent}30;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const AuthorRole = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
`;

const AuthorCompany = styled.span`
  color: ${props => props.theme.colors.accent};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const RatingStars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(IconWrapper)`
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Testimonials: React.FC = () => {
  return (
    <Section id="testimonials">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What People Say
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hear from colleagues, mentors, and collaborators about our work together and the impact of AI solutions.
        </SectionSubtitle>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <TestimonialCard whileHover={{ y: -5 }}>
                <QuoteIcon>
                  {React.createElement(FaQuoteLeft)}
                </QuoteIcon>
                
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                
                <TestimonialAuthor>
                  <AuthorImage image={testimonial.image} />
                  
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>
                      {testimonial.role} at <AuthorCompany>{testimonial.company}</AuthorCompany>
                    </AuthorRole>
                  </AuthorInfo>
                  
                  <RatingStars>
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex}>
                        {React.createElement(FaStar)}
                      </Star>
                    ))}
                  </RatingStars>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialsGrid>
      </Container>
    </Section>
  );
};

export default Testimonials;
