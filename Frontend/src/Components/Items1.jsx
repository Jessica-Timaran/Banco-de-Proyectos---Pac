import React from 'react';

const Items1 = ({ href, label, icon }) => {
  return (
    <li>
      <a href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black group">
        <div>
          {icon ? (
            <i className={`${icon} flex-shrink-0 w-5 h-5 dark:text-black`} aria-hidden="true"></i>
          ) : (
            <svg className="w-5 h-5" aria-hidden="true" viewBox="0 0 24 24">
              {/* Aquí puedes agregar el contenido SVG si es necesario */}
            </svg>
          )}
        </div>
        <span className="flex-1 ms-3 whitespace-nowrap pl-3">
          {label}
        </span>
      </a>
    </li>
  );
};

export default Items1;