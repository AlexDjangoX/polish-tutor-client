import React, { useState } from 'react';
import { Link, Router } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
        <div class-name='navbar-container'>
          <Link to='/' className='navbar-logo'>
            EXTC <i className='fab fa-typo3'></i>
            <i className='fa-solid fa-user'></i>
          </Link>
          <FontAwesomeIcon icon={solid('user-secret')} />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          {/* <FontAwesomeIcon icon={regular('coffee')} /> */}
          <FontAwesomeIcon icon={brands('twitter')} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
