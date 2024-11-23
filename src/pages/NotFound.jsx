/* eslint-disable no-unused-vars */
import React from 'react';
import './styles/NotFound.css'; // Import the CSS file for styling

const NotFound = () => {
    return (
       <div className='main-container'>
         <div className="not-found-container">
            <h1 className="not-found-title">404 Not Found</h1>
            <p className="not-found-message">The page you are looking for does not exist.</p>
            <a href="/" className="not-found-link">Go Back to Home</a>
        </div>
       </div>
    );
};

export default NotFound;
