import React from 'react';

const Pagination = ({ currentPage, onNext, onPrev, hasNext, hasPrev }) => {
    return (
        <div className="ms-pagination">
            <button
                className="ms-page-btn"
                onClick={onPrev}
                disabled={!hasPrev}
            >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
                Previous
            </button>

            <span className="ms-page-info">
                Page <span className="ms-page-number">{currentPage}</span>
            </span>

            <button
                className="ms-page-btn"
                onClick={onNext}
                disabled={!hasNext}
            >
                Next
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
            </button>

            <style>{`
        .ms-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--sp-xl);
          padding: var(--sp-3xl) 0;
          margin-top: var(--sp-xl);
          border-top: 1px solid var(--glass-border);
        }

        .ms-page-btn {
          display: flex;
          align-items: center;
          gap: var(--sp-sm);
          padding: 10px 20px;
          border-radius: var(--r-full);
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--t-fast);
        }
        
        .ms-page-btn:hover:not(:disabled) {
          background: var(--bg-hover);
          border-color: var(--accent-start);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .ms-page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: transparent;
          border-color: transparent;
        }

        .ms-page-info {
          font-size: 16px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        
        .ms-page-number {
          color: var(--text-primary);
          font-weight: 700;
          padding: 0 4px;
        }
      `}</style>
        </div>
    );
};

export default Pagination;
