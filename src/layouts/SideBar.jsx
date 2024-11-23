/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = ({ }) => {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <span className="material-icons-outlined">shopping_cart</span> STORE
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to={'/'}>
            <span className="material-icons-outlined">dashboard</span> Dashboard{' '}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to={'/products'}>
            {' '}
            <span className="material-icons-outlined">inventory_2</span>{' '}
            Products{' '}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to={'/stock'}>
            {' '}
            <span className="material-icons-outlined">
              inventory
            </span> Stock{' '}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to={'logs'}>
            {' '}
            <span className="material-icons-outlined">poll</span> Reports{' '}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to={'/settings'}>
            {' '}
            <span className="material-icons-outlined">
              settings
            </span> Settings{' '}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
