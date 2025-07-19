export const theme = {
  colors: {
    // Background colors
    background: '#0A0A0A',
    backgroundSecondary: '#121212',
    surface: '#1A1A1A',
    surfaceLight: '#242424',
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textMuted: '#666666',
    
    // Accent colors
    accent: '#3B82F6', // Blue
    accentHover: '#2563EB',
    accentSecondary: '#8B5CF6', // Purple
    accentTertiary: '#10B981', // Green
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    
    // Border colors
    border: '#2A2A2A',
    borderLight: '#3A3A3A',
    
    // Shadow
    shadow: 'rgba(0, 0, 0, 0.5)',
    shadowLight: 'rgba(0, 0, 0, 0.2)',
  },
  
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
    '4xl': '8rem',  // 128px
    '5xl': '12rem', // 192px
  },
  
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    glowPurple: '0 0 20px rgba(139, 92, 246, 0.3)',
    glowGreen: '0 0 20px rgba(16, 185, 129, 0.3)',
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
    ultrawide: '1400px',
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export type Theme = typeof theme;

// Styled-components theme declaration
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
