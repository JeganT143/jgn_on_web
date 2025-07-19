import React from 'react';
import { IconType } from 'react-icons';

interface IconWrapperProps {
  icon: IconType;
  size?: string | number;
  color?: string;
  className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: IconComponent, 
  size, 
  color, 
  className 
}) => {
  return React.createElement(IconComponent as React.ComponentType<any>, {
    size,
    color,
    className
  });
};
