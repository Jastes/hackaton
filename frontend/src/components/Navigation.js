import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '대시보드', icon: '📊' },
    { path: '/chart', label: '차트', icon: '📈' },
    { path: '/trades', label: '거래 내역', icon: '📋' }
  ];

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📈</span>
          <span className="logo-text">암호화폐 시뮬레이터</span>
        </Link>
        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

