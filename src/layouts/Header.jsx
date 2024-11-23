import React from 'react';
import './styles/header.css';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className='header'>
      <div className='menu-icon' onClick={onToggleSidebar}>
        <span className='material-icons-outlined'>menu</span>
      </div>
    </header>
  );
};

export default Header;
