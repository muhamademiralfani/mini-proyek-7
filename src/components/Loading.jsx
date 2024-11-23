import React from 'react';
import './styles/Loading.css'; // Import the CSS file for styling

const Loading = () => {
  return (
    <div className="main-container">
      {' '}
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
