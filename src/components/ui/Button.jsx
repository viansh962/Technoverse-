import React from 'react';
import clsx from 'clsx';

export function Button({ children, variant = 'primary', className, ...props }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}