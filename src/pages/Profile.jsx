// pages/Profile.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(() => {
    const defaults = { name: 'Demo User', channel: 'Demo Channel', videos: 12, avatar: '' }
    try {
      const raw = localStorage.getItem('profile')
      return raw ? JSON.parse(raw) : defaults
    } catch {
      return defaults
    }
  })

  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setUser((u) => ({ ...u, [name]: value }))
    setSaved(false)
  }

  function save() {
    localStorage.setItem('profile', JSON.stringify(user))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = user.name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')

  return (
    <>
      <div className="ms-profile fade-in">
        <div className="ms-profile-header">
          <h2 className="ms-profile-heading">Your Profile</h2>
          <p className="ms-profile-sub">Manage your personal information</p>
        </div>

        <div className="ms-profile-card glass">
          {/* Avatar */}
          <div className="ms-profile-avatar-section">
            <div className="ms-profile-avatar">
              <span>{initials}</span>
            </div>
            <div className="ms-profile-avatar-info">
              <h3>{user.name}</h3>
              <p>{user.channel}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="ms-profile-stats">
            <div className="ms-stat-item">
              <span className="ms-stat-num">{user.videos}</span>
              <span className="ms-stat-label">Videos</span>
            </div>
            <div className="ms-stat-item">
              <span className="ms-stat-num">1.2K</span>
              <span className="ms-stat-label">Subscribers</span>
            </div>
            <div className="ms-stat-item">
              <span className="ms-stat-num">45K</span>
              <span className="ms-stat-label">Views</span>
            </div>
          </div>

          {/* Form */}
          <div className="ms-profile-form">
            <div className="ms-form-group">
              <label className="ms-form-label">Display Name</label>
              <input
                name="name"
                value={user.name}
                onChange={handleChange}
                className="input-styled"
                placeholder="Your name"
              />
            </div>
            <div className="ms-form-group">
              <label className="ms-form-label">Channel Name</label>
              <input
                name="channel"
                value={user.channel}
                onChange={handleChange}
                className="input-styled"
                placeholder="Channel name"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="ms-profile-actions">
            <button onClick={save} className="btn-gradient ms-save-btn">
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
            <Link to="/upload" className="btn-ghost">
              Upload Video
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .ms-profile {
          max-width: 640px;
          margin: 0 auto;
          padding: var(--sp-xl) 0;
        }

        .ms-profile-header {
          margin-bottom: var(--sp-2xl);
        }
        .ms-profile-heading {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: var(--sp-xs);
          letter-spacing: -0.5px;
        }
        .ms-profile-sub {
          color: var(--text-muted);
          font-size: 14px;
        }

        .ms-profile-card {
          border-radius: var(--r-xl);
          padding: var(--sp-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--sp-2xl);
        }

        .ms-profile-avatar-section {
          display: flex;
          align-items: center;
          gap: var(--sp-lg);
        }

        .ms-profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: var(--r-xl);
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
          box-shadow: var(--shadow-glow);
        }

        .ms-profile-avatar-info h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .ms-profile-avatar-info p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .ms-profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--sp-lg);
        }

        .ms-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: var(--sp-lg);
          background: var(--bg-card);
          border-radius: var(--r-md);
          border: 1px solid var(--glass-border);
        }

        .ms-stat-num {
          font-size: 22px;
          font-weight: 700;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ms-stat-label {
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ms-profile-form {
          display: flex;
          flex-direction: column;
          gap: var(--sp-lg);
        }

        .ms-form-group {
          display: flex;
          flex-direction: column;
          gap: var(--sp-sm);
        }

        .ms-form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ms-profile-actions {
          display: flex;
          gap: var(--sp-md);
          align-items: center;
        }

        .ms-save-btn {
          padding: var(--sp-md) var(--sp-2xl);
          min-width: 140px;
        }
      `}</style>
    </>
  )
}
