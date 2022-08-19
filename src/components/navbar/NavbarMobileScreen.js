import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavbarMobileScreen = ({ screenWidth, closeMobileMenu }) => {
  return (
    <>
      {screenWidth <= 960 && (
        <div className='drop-down'>
          <div className='navbar-menu-wrapper'>
            <ul className='navbar-menu'>
              <li className='navbar-menu-item'>
                <Link
                  to='/'
                  className='navbar-menu-link'
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className='navbar-menu-item'>
                <Link
                  to='/experience'
                  className='navbar-menu-link'
                  onClick={closeMobileMenu}
                >
                  Experience
                </Link>
              </li>
              <li className='navbar-menu-item'>
                <Link
                  to='/kanban'
                  className='navbar-menu-link'
                  onClick={closeMobileMenu}
                >
                  Kanban
                </Link>
              </li>
              <li className='navbar-menu-item'>
                <Link
                  to='/profile'
                  className='navbar-menu-link'
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
              <li className='navbar-menu-item'>
                <Link
                  to='/contact'
                  className='navbar-menu-link'
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarMobileScreen;
