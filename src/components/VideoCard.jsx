// components/VideoCard.jsx
import { Link } from 'react-router-dom'

export default function VideoCard({ video, index = 0 }) {
  return (
    <>
      <Link
        to={`/watch/${video.id}`}
        className="ms-vcard"
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        <div className="ms-vcard-thumb">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="ms-vcard-img"
            loading="lazy"
          />
          <div className="ms-vcard-overlay">
            <div className="ms-vcard-play">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="ms-vcard-info">
          <div className="ms-vcard-avatar">
            {video.channel?.charAt(0)}
          </div>
          <div className="ms-vcard-details">
            <h3 className="ms-vcard-title">{video.title}</h3>
            <p className="ms-vcard-channel">{video.channel}</p>
            <p className="ms-vcard-meta">
              {video.views} • {video.time}
            </p>
          </div>
        </div>
      </Link>

      <style>{`
        .ms-vcard {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: var(--text-primary);
          border-radius: var(--r-lg);
          transition: all var(--t-med);
          animation: fadeInUp 0.5s var(--ease-out) both;
        }
        .ms-vcard:hover {
          transform: translateY(-6px);
        }

        .ms-vcard-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: var(--r-lg);
          overflow: hidden;
          position: relative;
          background: var(--bg-card);
        }

        .ms-vcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--t-med);
        }
        .ms-vcard:hover .ms-vcard-img {
          transform: scale(1.08);
        }

        .ms-vcard-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10, 10, 26, 0.8) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--t-fast);
        }
        .ms-vcard:hover .ms-vcard-overlay {
          opacity: 1;
        }

        .ms-vcard-play {
          width: 56px;
          height: 56px;
          border-radius: var(--r-full);
          background: rgba(124, 58, 237, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          transform: scale(0.8);
          transition: transform var(--t-fast);
        }
        .ms-vcard:hover .ms-vcard-play {
          transform: scale(1);
        }

        .ms-vcard-info {
          display: flex;
          gap: var(--sp-md);
          padding: var(--sp-md) var(--sp-xs);
        }

        .ms-vcard-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--r-full);
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }

        .ms-vcard-details {
          flex: 1;
          min-width: 0;
        }

        .ms-vcard-title {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ms-vcard-channel {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 2px;
          transition: color var(--t-fast);
        }
        .ms-vcard:hover .ms-vcard-channel {
          color: var(--accent-end);
        }

        .ms-vcard-meta {
          font-size: 12px;
          color: var(--text-muted);
        }
      `}</style>
    </>
  )
}