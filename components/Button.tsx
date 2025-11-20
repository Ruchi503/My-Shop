import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-stone-800 text-white hover:bg-stone-700 shadow-sm hover:shadow-md active:scale-95 focus:ring-stone-800",
    secondary: "bg-pink-100 text-stone-800 hover:bg-pink-200 shadow-sm hover:shadow-md active:scale-95 focus:ring-pink-200",
    outline: "border-2 border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-800 active:scale-95 focus:ring-stone-200"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};