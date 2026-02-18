// pages/Watch.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getVideo } from '../lib/api'
import { useWatchHistory } from '../hooks/useWatchHistory'

export default function Watch() {
  const { id } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [descExpanded, setDescExpanded] = useState(false)
  const { addToHistory } = useWatchHistory()

  useEffect(() => {
    let mounted = true

    const loadVideo = async () => {
      setLoading(true)
      try {
        const videoData = await getVideo(id)
        if (mounted && videoData) {
          setVideo(videoData)
          addToHistory(videoData)
        }
      } catch (error) {
        console.error('Failed to load video:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadVideo()
    return () => { mounted = false }
  }, [id])

  if (loading) {
    return (
      <>
        <div className="ms-watch-loading">
          <div className="skeleton" style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--r-lg)' }} />
          <div className="skeleton" style={{ width: '60%', height: 24, marginTop: 20, borderRadius: 'var(--r-sm)' }} />
          <div className="skeleton" style={{ width: '40%', height: 16, marginTop: 12, borderRadius: 'var(--r-sm)' }} />
        </div>
      </>
    )
  }

  if (!video) {
    return (
      <div className="ms-watch-error">
        <svg viewBox="0 0 24 24" width="64" height="64" fill="var(--text-muted)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <h2>Video not found</h2>
        <Link to="/" className="btn-gradient">Go back home</Link>
      </div>
    )
  }

  return (
    <>
      <div className="ms-watch fade-in">
        {/* Player */}
        <div className="ms-player-wrap">
          <div className="ms-player-glow" />
          <div className="ms-player-container">
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              title={video.title}
              className="ms-player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Info */}
        <div className="ms-watch-info">
          <h1 className="ms-watch-title">{video.title}</h1>

          <div className="ms-watch-meta">
            <div className="ms-watch-channel">
              <div className="ms-watch-avatar">{video.channel?.charAt(0)}</div>
              <div>
                <p className="ms-watch-channel-name">{video.channel}</p>
                <p className="ms-watch-stats">{video.views} • {video.time}</p>
              </div>
            </div>

            <div className="ms-watch-actions">
              <button className="btn-ghost ms-action-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" /></svg>
                Like
              </button>
              <button className="btn-ghost ms-action-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" /></svg>
                Dislike
              </button>
              <button className="btn-ghost ms-action-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
                Share
              </button>
              <button className="btn-ghost ms-action-btn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                Save
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="ms-watch-desc glass" onClick={() => setDescExpanded(!descExpanded)}>
            <p className={`ms-desc-text ${descExpanded ? 'expanded' : ''}`}>
              {video.description}
            </p>
            <button className="ms-desc-toggle">
              {descExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="ms-watch-nav">
          <Link to="/" className="btn-ghost">
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        .ms-watch {
          max-width: 1100px;
          margin: 0 auto;
        }

        .ms-watch-loading {
          max-width: 1100px;
          margin: 0 auto;
          padding: var(--sp-xl) 0;
        }

        .ms-watch-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--sp-xl);
          min-height: 60vh;
          color: var(--text-primary);
          text-align: center;
        }

        /* Player */
        .ms-player-wrap {
          position: relative;
          margin-bottom: var(--sp-xl);
        }

        .ms-player-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%);
          filter: blur(40px);
          opacity: 0.4;
          z-index: 0;
          pointer-events: none;
        }

        .ms-player-container {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: var(--r-lg);
          overflow: hidden;
          background: black;
          box-shadow: var(--shadow-lifted);
        }

        .ms-player {
          width: 100%;
          height: 100%;
        }

        /* Info */
        .ms-watch-info {
          padding: var(--sp-sm) 0;
        }

        .ms-watch-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: var(--sp-lg);
          letter-spacing: -0.3px;
        }

        .ms-watch-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--sp-lg);
          padding-bottom: var(--sp-lg);
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: var(--sp-lg);
        }

        .ms-watch-channel {
          display: flex;
          align-items: center;
          gap: var(--sp-md);
        }

        .ms-watch-avatar {
          width: 48px;
          height: 48px;
          border-radius: var(--r-full);
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .ms-watch-channel-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .ms-watch-stats {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .ms-watch-actions {
          display: flex;
          gap: var(--sp-sm);
          flex-wrap: wrap;
        }

        .ms-action-btn {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
        }

        /* Description */
        .ms-watch-desc {
          padding: var(--sp-lg);
          border-radius: var(--r-lg);
          cursor: pointer;
          transition: all var(--t-fast);
        }
        .ms-watch-desc:hover {
          background: var(--bg-hover);
        }

        .ms-desc-text {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-secondary);
          white-space: pre-wrap;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ms-desc-text.expanded {
          -webkit-line-clamp: unset;
          display: block;
        }

        .ms-desc-toggle {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          padding: 0;
          margin-top: var(--sp-sm);
          font-family: inherit;
        }

        /* Nav */
        .ms-watch-nav {
          padding: var(--sp-xl) 0;
          border-top: 1px solid var(--glass-border);
          margin-top: var(--sp-xl);
        }

        @media (max-width: 768px) {
          .ms-watch-title {
            font-size: 18px;
          }
          .ms-watch-actions {
            width: 100%;
          }
          .ms-action-btn {
            flex: 1;
            justify-content: center;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  )
}