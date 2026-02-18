// components/sidebar.jsx
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  {
    label: 'Home',
    path: '/',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    label: 'Trending',
    path: '/',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l.97-5.68L2.29 10.12a1 1 0 01.56-1.71l5.7-.83L11.1 2.4a1 1 0 011.78 0l2.56 5.18 5.7.83a1 1 0 01.56 1.71l-4.13 4.03.97 5.68a1 1 0 01-1 1.17z" />
      </svg>
    ),
  },
  {
    label: 'Subscriptions',
    path: '/subscriptions',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
  {
    label: 'Library',
    path: '/library',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z" />
      </svg>
    ),
  },
  {
    label: 'History',
    path: '/history',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <>
      <aside className="ms-sidebar">
        <div className="ms-sidebar-inner">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path === '/' && location.pathname === '/' && !location.search)
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`ms-sidebar-item ${isActive ? 'active' : ''}`}
              >
                <div className="ms-sidebar-icon">{item.icon}</div>
                <span className="ms-sidebar-label">{item.label}</span>
                {isActive && <div className="ms-sidebar-indicator" />}
              </Link>
            )
          })}
        </div>

        <div className="ms-sidebar-footer">
          <div className="ms-sidebar-divider" />
          <p className="ms-sidebar-credit">I Watch © 2026</p>
        </div>
      </aside>

      <style>{`
        .ms-sidebar {
          width: var(--sidebar-w);
          height: calc(100vh - var(--navbar-h));
          position: sticky;
          top: var(--navbar-h);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--sp-lg) 0;
          background: var(--bg-primary);
          border-right: 1px solid var(--glass-border);
          overflow-y: auto;
          flex-shrink: 0;
        }

        .ms-sidebar-inner {
          display: flex;
          flex-direction: column;
          gap: var(--sp-xs);
          padding: 0 var(--sp-sm);
        }

        .ms-sidebar-item {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          padding: var(--sp-md) var(--sp-lg);
          border-radius: var(--r-md);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          transition: all var(--t-fast);
        }
        .ms-sidebar-item:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .ms-sidebar-item.active {
          background: rgba(124, 58, 237, 0.12);
          color: var(--text-primary);
        }

        .ms-sidebar-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ms-sidebar-item.active .ms-sidebar-icon {
          color: var(--accent-start);
        }

        .ms-sidebar-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 24px;
          border-radius: 0 var(--r-sm) var(--r-sm) 0;
          background: var(--accent-gradient);
        }

        .ms-sidebar-footer {
          padding: 0 var(--sp-lg);
        }

        .ms-sidebar-divider {
          height: 1px;
          background: var(--glass-border);
          margin-bottom: var(--sp-md);
        }

        .ms-sidebar-credit {
          font-size: 11px;
          color: var(--text-muted);
          text-align: center;
        }

        @media (max-width: 768px) {
          .ms-sidebar {
            display: none;
          }
        }
      `}</style>
    </>
  )
}