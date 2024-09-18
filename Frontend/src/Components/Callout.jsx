// Callout.js (Archivo donde creaste el componente Callout)
import React from 'react';

export const CalloutA = ({ variant, title, children }) => {
  let bgColor, textColor, borderColor;

  switch (variant) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      borderColor = 'border-green-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      borderColor = 'border-yellow-500';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      borderColor = 'border-red-500';
      break;
    case 'neutral':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      borderColor = 'border-gray-500';
      break;
    default:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      borderColor = 'border-blue-500';
  }

  return (
    <div className={`border-l-4 p-4 ${bgColor} ${borderColor} ${textColor} rounded-md`}>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p>{children}</p>
    </div>
  );
};