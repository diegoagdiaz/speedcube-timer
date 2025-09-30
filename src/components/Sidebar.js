import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '200px',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'gray',
                textDecoration: 'none',
                display: 'block',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: isActive ? 'var(--eerie-black)' : 'transparent',
                transition: 'background-color 0.3s'
              })}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--eerie-black)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = e.target.dataset.isActive === 'true' ? 'var(--eerie-black)' : 'transparent'}
            >
              Timer
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink
              to="/stats"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'gray',
                textDecoration: 'none',
                display: 'block',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: isActive ? 'var(--eerie-black)' : 'transparent',
                transition: 'background-color 0.3s'
              })}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--eerie-black)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = e.target.dataset.isActive === 'true' ? 'var(--eerie-black)' : 'transparent'}
            >
              Statistics
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink
              to="/settings"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'gray',
                textDecoration: 'none',
                display: 'block',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: isActive ? 'var(--eerie-black)' : 'transparent',
                transition: 'background-color 0.3s'
              })}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--eerie-black)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = e.target.dataset.isActive === 'true' ? 'var(--eerie-black)' : 'transparent'}
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutorial"
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'gray',
                textDecoration: 'none',
                display: 'block',
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: isActive ? 'var(--eerie-black)' : 'transparent',
                transition: 'background-color 0.3s'
              })}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--eerie-black)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = e.target.dataset.isActive === 'true' ? 'var(--eerie-black)' : 'transparent'}
            >
              How to Use
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;