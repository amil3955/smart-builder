import React from 'react';
import { Html } from '@react-three/drei';

const ErrorDisplay = ({ message = "Failed to load model" }) => {
  return (
    <Html center>
      <div className="bg-white p-4 rounded shadow-lg text-center w-80">
        <div className="text-red-600 text-lg font-medium mb-2">Error</div>
        <div className="text-gray-800">
          {message}
        </div>
        <div className="mt-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </Html>
  );
};

export default ErrorDisplay;