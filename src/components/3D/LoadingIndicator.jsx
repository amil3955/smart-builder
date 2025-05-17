import React from 'react';
import { Html } from '@react-three/drei';

const LoadingIndicator = ({ progress = 0 }) => {
  return (
    <Html center>
      {/* <div className="bg-white p-4 rounded shadow-lg text-center w-64">
        <div className="text-lg font-medium mb-2">Loading Model</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {Math.round(progress * 100)}%
        </div>
      </div> */}
      <div className="spinner">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>Loading...</div>
      </div>
    </Html>

  );
};

export default LoadingIndicator;