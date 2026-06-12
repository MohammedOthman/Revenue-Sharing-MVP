import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/partners', label: 'Partners', icon: '🤝' },
    { path: '/contracts', label: 'Contracts', icon: '📄' },
    { path: '/revenue', label: 'Revenue', icon: '💰' },
    { path: '/kpis', label: 'KPIs', icon: '📈' },
    { path: '/legal', label: 'Legal Docs', icon: '⚖️' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>RevenueShare</h2>
          {sidebarOpen && <span className="badge">B2B SaaS</span>}
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && (
            <div className="user-info">
              <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
              <div className="user-details">
                <p className="user-name">{user?.name || 'User'}</p>
                <p className="user-email">{user?.email || ''}</p>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <button 
            className="toggle-sidebar" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="header-right">
            <div className="notifications">
              <span>🔔</span>
              <span className="notification-badge">3</span>
            </div>
            <div className="user-menu">
              <span>{user?.name || 'User'}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
        </header>

        <main className="content-area">
          <div className="outlet">
            {/* Child routes render here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
