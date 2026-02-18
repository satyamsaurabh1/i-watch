import { Link } from 'react-router-dom'
import { useWatchHistory } from '../hooks/useWatchHistory'
import VideoCard from '../components/VideoCard'

export default function History() {
  const { history, clearHistory, removeFromHistory } = useWatchHistory()

  return (
    <div className="ms-history fade-in">
      <div className="ms-history-header">
        <h1>Watch History</h1>
        {history.length > 0 && (
          <button onClick={clearHistory} className="btn-ghost ms-clear-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 18h2V8H9v10zm4 0h2V8h-2v10z" />
            </svg>
            Clear All History
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="ms-grid">
          {history.map((video, index) => (
            <div key={`${video.id}-${index}`} className="ms-history-card-wrap">
              <VideoCard video={video} index={index} />
              <button
                className="ms-remove-btn"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromHistory(video.id);
                }}
                title="Remove from history"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="ms-no-history">
          <div className="ms-no-history-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="rgba(80,80,80,0.5)">
              <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.97 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
            </svg>
          </div>
          <h2>No watch history yet</h2>
          <p>Videos you watch will appear here</p>
          <Link to="/" className="btn-gradient">Browse Videos</Link>
        </div>
      )}

      <style>{`
        .ms-history {
          max-width: 1600px;
          margin: 0 auto;
        }

        .ms-history-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--sp-xl);
          padding-bottom: var(--sp-lg);
          border-bottom: 1px solid var(--glass-border);
        }

        .ms-history-header h1 {
          font-size: 24px;
          font-weight: 700;
        }

        .ms-clear-btn {
          color: var(--danger);
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
        }
        .ms-clear-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .ms-history-card-wrap {
          position: relative;
        }

        .ms-remove-btn {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 28px;
          height: 28px;
          border-radius: var(--r-full);
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: all var(--t-fast);
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .ms-history-card-wrap:hover .ms-remove-btn {
          opacity: 1;
        }

        .ms-remove-btn:hover {
          background: var(--danger);
          color: white;
          border-color: var(--danger);
          transform: scale(1.1);
        }

        .ms-no-history {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          gap: var(--sp-lg);
          text-align: center;
        }

        .ms-no-history-icon {
          width: 96px;
          height: 96px;
          border-radius: var(--r-full);
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--sp-md);
        }

        .ms-no-history h2 {
          font-size: 20px;
          margin-bottom: var(--sp-sm);
        }

        .ms-no-history p {
          color: var(--text-secondary);
          max-width: 300px;
        }

        .ms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: var(--sp-xl) var(--sp-lg);
        }
      `}</style>
    </div>
  )
}
