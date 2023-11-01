// components/Spinner.tsx

import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <style jsx>{`
        .spinner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Adjust the opacity here */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999; /* Ensure it's above other content */
        }

        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spinner-circle {
          width: 20px;
          height: 20px;
          background-color: #3498db;
          border-radius: 50%;
          margin: 0 5px;
          animation: spinnerAnimation 1s infinite ease-in-out;
        }

        @keyframes spinnerAnimation {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
      <div className="spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
    </div>
  );
};

export default Spinner;
