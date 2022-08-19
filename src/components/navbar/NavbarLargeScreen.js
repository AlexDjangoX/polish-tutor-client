import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLargeScreen = ({ screenWidth }) => {
  return (
    <>
      <ul
        className={
          screenWidth <= 960 ? 'nav-menu-active' : 'nav-menu-inactive links'
        }
      >
        <li className='navbar-list-item'>
          <Link to='/' className='navbar-link'>
            Home
          </Link>
        </li>
        <li className='navbar-list-item'>
          <Link to='/experience' className='navbar-link'>
            Experience
          </Link>
        </li>
        <li className='navbar-list-item'>
          <Link to='/kanban' className='navbar-link'>
            Kanban
          </Link>
        </li>
        <li className='navbar-list-item'>
          <Link to='/profile' className='navbar-link'>
            Profile
          </Link>
        </li>
        <li className='navbar-list-item'>
          <Link to='/contact' className='navbar-link'>
            Contact
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarLargeScreen;
