import React from 'react';
import './Navbar.css';

const Navigation = ({ onButtonSubmit }) => {
  return (
    <nav className='navbar'>
      <h3 className="logo">My Clients</h3>
      <div className='nav-links'>
        <button className="custom-button" onClick={onButtonSubmit}>
          Get Users
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
