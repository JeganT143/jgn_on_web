import { useEffect } from 'react';

export const useDynamicUnderline = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px'
      }
    );

    // Observe all section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title) => {
      observer.observe(title);
    });

    return () => {
      sectionTitles.forEach((title) => {
        observer.unobserve(title);
      });
    };
  }, []);
};
