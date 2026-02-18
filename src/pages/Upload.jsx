// pages/Upload.jsx
import { useState } from 'react'

export default function Upload() {
  const [title, setTitle] = useState('')
  const [channel, setChannel] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    alert(`Uploaded: ${title} by ${channel}`)
    setTitle('')
    setChannel('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <div className="ms-upload fade-in">
        <div className="ms-upload-header">
          <h2 className="ms-upload-heading">Upload Video</h2>
          <p className="ms-upload-sub">Share your content with the world</p>
        </div>

        <div className="ms-upload-card glass">
          {/* Drag zone */}
          <div className="ms-upload-zone">
            <div className="ms-upload-zone-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
              </svg>
            </div>
            <p className="ms-upload-zone-title">Drag & drop your video here</p>
            <p className="ms-upload-zone-sub">or click to browse files</p>
            <span className="ms-upload-zone-info">MP4, WebM, AVI up to 2GB</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="ms-upload-form">
            <div className="ms-form-group">
              <label className="ms-form-label">Video Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-styled"
                placeholder="Give your video a title..."
                required
              />
            </div>
            <div className="ms-form-group">
              <label className="ms-form-label">Channel</label>
              <input
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="input-styled"
                placeholder="Channel name"
                required
              />
            </div>
            <button type="submit" className="btn-gradient ms-submit-btn">
              {submitted ? '✓ Uploaded!' : 'Upload Video'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .ms-upload {
          max-width: 600px;
          margin: 0 auto;
          padding: var(--sp-xl) 0;
        }

        .ms-upload-header {
          margin-bottom: var(--sp-2xl);
        }
        .ms-upload-heading {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: var(--sp-xs);
          letter-spacing: -0.5px;
        }
        .ms-upload-sub {
          color: var(--text-muted);
          font-size: 14px;
        }

        .ms-upload-card {
          border-radius: var(--r-xl);
          padding: var(--sp-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--sp-2xl);
        }

        .ms-upload-zone {
          border: 2px dashed var(--glass-border);
          border-radius: var(--r-lg);
          padding: var(--sp-3xl) var(--sp-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-sm);
          cursor: pointer;
          transition: all var(--t-fast);
          text-align: center;
        }
        .ms-upload-zone:hover {
          border-color: var(--accent-mid);
          background: rgba(99, 102, 241, 0.05);
        }

        .ms-upload-zone-icon {
          color: var(--accent-mid);
          margin-bottom: var(--sp-sm);
        }

        .ms-upload-zone-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .ms-upload-zone-sub {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .ms-upload-zone-info {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: var(--sp-sm);
          padding: var(--sp-xs) var(--sp-md);
          background: var(--bg-card);
          border-radius: var(--r-full);
        }

        .ms-upload-form {
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

        .ms-submit-btn {
          padding: var(--sp-md) var(--sp-2xl);
          font-size: 15px;
          align-self: flex-start;
          min-width: 160px;
        }
      `}</style>
    </>
  )
}
