import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex">
        <div className="w-4 h-4 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: '-0.32s' }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: '-0.16s' }}></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full mx-1 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Spinner;