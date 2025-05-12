import React from 'react';

function DefaultLayout({ children }) {
  return (
    <div className="w-full h-ful">
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;