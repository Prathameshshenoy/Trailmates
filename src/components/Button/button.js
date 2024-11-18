import React from 'react';

const Button = ({ children, variant = 'default', className = '', ...props }) => {
  const base = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const styles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const style = styles[variant] || styles.default;

  return (
    <button className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
