import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './styles/enhanced.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useDynamicUnderline } from './hooks/useDynamicUnderline';
import { useSmoothSectionTransitions } from './hooks/useSmoothSectionTransitions';

function App() {
  useDynamicUnderline();
  useSmoothSectionTransitions();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LoadingScreen />
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Publications />
          <Certifications />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
