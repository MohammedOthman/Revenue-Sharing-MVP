import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Wordmark, Brandmark } from './brand/Brandmark';
import { Button } from './ui/kit';
import {
  IconGrid,
  IconPartners,
  IconProgram,
  IconDoc,
  IconClaim,
  IconGraph,
  IconStatement,
  IconDispute,
  IconLoop,
  IconAudit,
  IconMenu,
  IconLogout,
} from './ui/icons';
import '../styles/Layout.css';

const NAV = [
  {
    group: 'Overview',
    items: [{ to: '/', label: 'Command Center', end: true, Icon: IconGrid }],
  },
  {
    group: 'Capture',
    items: [
      { to: '/partners', label: 'Partners', Icon: IconPartners },
      { to: '/programs', label: 'Programs', Icon: IconProgram },
      { to: '/agreements', label: 'Agreements', Icon: IconDoc },
      { to: '/claims', label: 'Claims', Icon: IconClaim },
    ],
  },
  {
    group: 'Attribute & settle',
    items: [
      { to: '/attribution', label: 'Attribution', Icon: IconGraph },
      { to: '/statements', label: 'Statements', Icon: IconStatement },
      { to: '/disputes', label: 'Disputes', Icon: IconDispute },
    ],
  },
  {
    group: 'Operate',
    items: [
      { to: '/cadence', label: 'Cadence', Icon: IconLoop },
      { to: '/audit', label: 'Audit log', Icon: IconAudit },
    ],
  },
];

export default function Layout() {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initial = (user?.name || user?.email || 'U').charAt(0).toUpperCase();

  return (
    <div className={`shell ${open ? 'shell--open' : 'shell--rail'}`}>
      <aside className="nav">
        <div className="nav__top">
          {open ? <Wordmark size={24} /> : <Brandmark size={26} />}
          <button
            className="nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Collapse navigation' : 'Expand navigation'}
          >
            <IconMenu />
          </button>
        </div>

        <nav className="nav__scroll">
          {NAV.map((section) => (
            <div className="nav__group" key={section.group}>
              <span className="nav__grouplabel label">{section.group}</span>
              {section.items.map(({ to, label, end, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className="nav__item"
                  title={label}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-marker"
                          className="nav__marker"
                          transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                        />
                      )}
                      <span className="nav__icon">
                        <Icon />
                      </span>
                      <span className="nav__label">{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="nav__foot">
          <div className="nav__user" title={user?.email || ''}>
            <span className="nav__avatar" aria-hidden="true">
              {initial}
            </span>
            <span className="nav__userinfo">
              <span className="nav__username">{user?.name || 'Signed in'}</span>
              <span className="nav__useremail">{user?.email || ''}</span>
            </span>
          </div>
          <button className="nav__logout" onClick={handleLogout} title="Sign out">
            <IconLogout />
            <span className="nav__label">Sign out</span>
          </button>
        </div>
      </aside>

      <div className="shell__main">
        <header className="topbar">
          <button
            className="topbar__menu"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <IconMenu />
          </button>
          <div className="topbar__spacer" />
          <span className="topbar__tenant label">Reven · Demo tenant</span>
          <Button to="/claims" variant="primary" size="sm" arrow>
            Register claim
          </Button>
        </header>

        <main className="content">
          <div className="content__inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
