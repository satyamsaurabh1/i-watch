// components/navbar.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchHistory } from '../hooks/useSearchHistory'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const { history, addToHistory } = useSearchHistory()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addToHistory(searchQuery)
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      <nav className="ms-navbar glass">
        {/* Left */}
        <div className="ms-nav-left">
          <Link to="/" className="ms-logo">
            <div className="ms-logo-icon">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M8 5v14l11-7z" fill="url(#logoGrad)" />
              </svg>
            </div>
            <span className="ms-logo-text">I <span className="ms-logo-accent">Watch</span></span>
          </Link>
        </div>

        {/* Search */}
        <div className="ms-nav-center">
          <form onSubmit={handleSearch} className={`ms-search-form ${focused ? 'focused' : ''}`}>
            <svg className="ms-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="ms-search-input"
            />
            {searchQuery && (
              <button type="button" className="ms-search-clear" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}

            {focused && history.length > 0 && (
              <div className="ms-search-history" onMouseDown={(e) => e.preventDefault()}>
                {history.map((term, index) => (
                  <button
                    key={index}
                    className="ms-history-item"
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/?search=${encodeURIComponent(term)}`);
                      setFocused(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.97 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                    </svg>
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Right */}
        <div className="ms-nav-right">
          <Link to="/upload" className="ms-nav-btn ms-upload-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </Link>
          <Link to="/profile" className="ms-avatar">
            <span>U</span>
          </Link>
        </div>
      </nav>

      <style>{`
        .ms-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 var(--sp-xl);
          height: var(--navbar-h);
          border-bottom: 1px solid var(--glass-border);
        }

        .ms-nav-left {
          display: flex;
          align-items: center;
          min-width: 180px;
        }

        .ms-logo {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
          text-decoration: none;
          color: var(--text-primary);
        }

        .ms-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--r-md);
          background: rgba(124, 58, 237, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--t-fast);
        }
        .ms-logo:hover .ms-logo-icon {
          background: rgba(124, 58, 237, 0.25);
          transform: scale(1.05);
        }

        .ms-logo-text {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .ms-logo-accent {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ms-nav-center {
          flex: 1;
          max-width: 560px;
          margin: 0 var(--sp-xl);
        }

        .ms-search-form {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-full);
          padding: 0 var(--sp-lg);
          height: 42px;
          transition: all var(--t-fast);
        }
          border-color: var(--accent-mid);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .ms-search-form:has(.ms-search-history) {
          position: relative;
        }

        .ms-search-history {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-top: none;
          border-bottom-left-radius: var(--r-lg);
          border-bottom-right-radius: var(--r-lg);
          padding: var(--sp-sm) 0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          z-index: 101;
        }

        .ms-history-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          padding: var(--sp-sm) var(--sp-lg);
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
          text-align: left;
          transition: background var(--t-fast);
        }
        .ms-history-item:hover {
          background: var(--bg-hover);
        }
        .ms-history-item svg {
          color: var(--text-muted);
        }

        .ms-search-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .ms-search-input {
          flex: 1;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          font-family: inherit;
          outline: none;
        }
        .ms-search-input::placeholder {
          color: var(--text-muted);
        }

        .ms-search-clear {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 14px;
          padding: 4px;
          cursor: pointer;
          transition: color var(--t-fast);
        }
        .ms-search-clear:hover {
          color: var(--text-primary);
        }

        .ms-nav-right {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
          min-width: 100px;
          justify-content: flex-end;
        }

        .ms-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--r-full);
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--t-fast);
        }
        .ms-nav-btn:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
          border-color: var(--accent-start);
          box-shadow: 0 0 12px rgba(124, 58, 237, 0.15);
        }

        .ms-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--r-full);
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          transition: all var(--t-fast);
          box-shadow: 0 0 0 2px transparent;
        }
        .ms-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }

        @media (max-width: 768px) {
          .ms-navbar {
            padding: 0 var(--sp-lg);
          }
          .ms-logo-text {
            display: none;
          }
          .ms-nav-center {
            margin: 0 var(--sp-sm);
          }
        }
      `}</style>
    </>
  )
}