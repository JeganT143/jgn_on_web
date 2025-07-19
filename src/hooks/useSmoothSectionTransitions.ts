import { useEffect } from 'react';

export const useSmoothSectionTransitions = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        // Check if section is in viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Active section
          section.classList.add('section-active');
          section.classList.remove('section-inactive');
          
          // Apply specific theme colors based on section
          document.documentElement.style.setProperty(
            '--current-section-color',
            getSectionColor(sectionId || '')
          );
        } else {
          // Inactive section
          section.classList.remove('section-active');
          section.classList.add('section-inactive');
        }
      });
    };

    const getSectionColor = (sectionId: string): string => {
      const colorMap: { [key: string]: string } = {
        'home': '0, 212, 255',      // Cyan
        'about': '0, 255, 136',     // Green
        'skills': '139, 69, 255',   // Purple
        'projects': '255, 122, 0',  // Orange
        'publications': '0, 188, 212', // Teal
        'certifications': '233, 30, 99', // Pink
        'testimonials': '63, 81, 181',   // Indigo
        'contact': '244, 67, 54'    // Red
      };
      return colorMap[sectionId] || '0, 212, 255';
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);
};
