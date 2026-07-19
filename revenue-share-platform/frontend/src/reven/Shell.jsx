import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { Icon } from './ui';

const NAV = [
  { to: '/', icon: 'space_dashboard', label: 'Command Center', end: true },
  { to: '/claims', icon: 'receipt_long', label: 'Claims' },
  { to: '/partners', icon: 'handshake', label: 'Partners' },
  { to: '/agreements', icon: 'gavel', label: 'Agreements' },
];

export default function Shell() {
  const { session, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="logo"><Icon name="hub" /></span> Reven</div>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <Icon name={n.icon} /> {n.label}
          </NavLink>
        ))}
        <div className="spacer" />
        <div className="nav-item" onClick={() => { logout(); nav('/login'); }}><Icon name="logout" /> Sign out</div>
        <div className="tenant">Phase 1 · Capture — no money moves; eligibility is preview only.</div>
      </aside>
      <div className="main">
        <div className="topbar">
          <h1>{session?.tenant?.name || 'Workspace'}</h1>
          <div className="muted" style={{ fontSize: 13 }}>{session?.user?.email}</div>
        </div>
        <div className="content"><Outlet /></div>
      </div>
    </div>
  );
}
