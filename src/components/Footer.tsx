import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';
import { personalInfo, navigationItems } from '../data/portfolioData';
import { Container, IconWrapper } from './StyledComponents';

const FooterSection = styled.footer`
  background: linear-gradient(135deg, rgba(10, 10, 20, 0.98) 0%, rgba(15, 20, 35, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-top: 2px solid rgba(0, 212, 255, 0.3);
  padding: ${props => props.theme.spacing['2xl']} 0 ${props => props.theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.8), rgba(0, 255, 136, 0.8), transparent);
    box-shadow: 0 0 25px rgba(0, 212, 255, 0.4);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
    text-align: center;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Logo = styled.div`
  font-family: 'Orbitron', monospace;
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
  
  span {
    background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
  }
`;

const FooterDescription = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  max-width: 350px;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.3px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: none;
  }
`;

const FooterSection1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FooterTitle = styled.h3`
  font-family: 'Orbitron', monospace;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.normal};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.base};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    text-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
    transform: translateX(5px);
  }
  
  &::before {
    content: '→';
    position: absolute;
    left: -20px;
    opacity: 0;
    transition: all 0.3s ease;
    color: ${props => props.theme.colors.accent};
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1));
  border: 1px solid rgba(0, 212, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.xl};
  transition: all ${props => props.theme.transitions.normal};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 255, 136, 0.2));
    color: ${props => props.theme.colors.accent};
    transform: translateY(-5px) scale(1.1);
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.5),
      0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 212, 255, 0.6);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-weight: 400;
`;

const BackToTopButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.accentSecondary});
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: ${props => props.theme.colors.background};
  font-size: ${props => props.theme.fontSizes.xl};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.accentSecondary}, ${props => props.theme.colors.accent});
    transform: translateY(-5px) scale(1.1);
    box-shadow: 
      0 0 30px rgba(0, 212, 255, 0.6),
      0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 212, 255, 0.6);
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent>
          <FooterBrand>
            <Logo>
              John<span>Doe</span>
            </Logo>
            <FooterDescription>
              AI/ML Engineer passionate about creating intelligent solutions that transform data into decisions and pixels into insights.
            </FooterDescription>
            <SocialLinks>
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
          </FooterBrand>
          
          <FooterSection1>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              {navigationItems.slice(0, 4).map((item) => (
                <FooterLink
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterSection1>
          
          <FooterSection1>
            <FooterTitle>More</FooterTitle>
            <FooterLinks>
              {navigationItems.slice(4).map((item) => (
                <FooterLink
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item.name}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterSection1>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            © {currentYear} {personalInfo.name}. Made with{' '}
            <IconWrapper color="#EF4444">
              {React.createElement(FaHeart)}
            </IconWrapper>{' '}
            and lots of coffee.
          </Copyright>
          
          <BackToTopButton
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconWrapper>
              {React.createElement(FaArrowUp)}
            </IconWrapper>
          </BackToTopButton>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
