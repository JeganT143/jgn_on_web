import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navigationItems } from '../data/portfolioData';
import { Container, IconWrapper } from './StyledComponents';

const NavbarContainer = styled(motion.nav)<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.sticky};
  background: ${props => props.isScrolled ? `${props.theme.colors.background}95` : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.isScrolled ? `1px solid ${props.theme.colors.border}` : 'none'};
  transition: all ${props => props.theme.transitions.normal};
  padding: ${props => props.theme.spacing.sm} 0;
  animation: ${props => props.isScrolled ? 'subtleGlow 4s ease-in-out infinite' : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
    opacity: ${props => props.isScrolled ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.xs} 0;
    background: ${props => props.theme.colors.background}98;
    backdrop-filter: blur(10px);
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const NavContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 50px;
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const Logo = styled(motion.div)`
  font-family: 'Orbitron', monospace;
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  letter-spacing: 1px;
  margin-right: ${props => props.theme.spacing.xl};
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  
  span {
    background: linear-gradient(135deg, #00d4ff, #00ff88);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-right: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.base};
    margin-right: ${props => props.theme.spacing.sm};
    letter-spacing: 0.5px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  font-family: 'Space Grotesk', sans-serif;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.lg};
  text-decoration: none;
  position: relative;
  transition: all ${props => props.theme.transitions.normal};
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  
  &:hover {
    color: #00d4ff;
    background: rgba(0, 212, 255, 0.1);
    backdrop-filter: blur(10px);
    transform: translateY(-2px);
  }
  
  &.active {
    color: #00d4ff;
    background: rgba(0, 212, 255, 0.15);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00d4ff, #00ff88);
    transition: width ${props => props.theme.transitions.normal};
    border-radius: 1px;
  }
  
  &:hover::after,
  &.active::after {
    width: 80%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.xl};
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.background}95;
  backdrop-filter: blur(10px);
  z-index: ${props => props.theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xl};
`;

const MobileNavLink = styled(motion.a)`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes['2xl']};
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = navigationItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionChange);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer
        isScrolled={isScrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <Logo
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#home')}
          >
            Jegan<span>Thiruppathi</span>
          </Logo>
          
          <NavLinks>
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                className={activeSection === item.href.substring(1) ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </NavLink>
            ))}
          </NavLinks>
          
          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconWrapper>
              {React.createElement(FaBars)}
            </IconWrapper>
          </MobileMenuButton>
        </NavContainer>
      </NavbarContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconWrapper>
                {React.createElement(FaTimes)}
              </IconWrapper>
            </CloseButton>
            
            {navigationItems.map((item, index) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
