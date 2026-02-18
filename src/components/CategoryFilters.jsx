// components/CategoryFilters.jsx
import { useRef } from 'react'

export default function CategoryFilters({ categories, selectedCategory, onSelectCategory }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <div className="ms-filters">
        <button className="ms-filter-arrow ms-filter-arrow-left" onClick={() => scroll('left')}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <div className="ms-filter-scroll" ref={scrollRef}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ms-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button className="ms-filter-arrow ms-filter-arrow-right" onClick={() => scroll('right')}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      <style>{`
        .ms-filters {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: var(--sp-xl);
          gap: var(--sp-sm);
        }

        .ms-filter-scroll {
          display: flex;
          gap: var(--sp-sm);
          overflow-x: auto;
          scrollbar-width: none;
          flex: 1;
          padding: var(--sp-xs) 0;
        }
        .ms-filter-scroll::-webkit-scrollbar {
          display: none;
        }

        .ms-filter-chip {
          padding: var(--sp-sm) var(--sp-lg);
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: var(--r-full);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          transition: all var(--t-fast);
          font-family: inherit;
        }
        .ms-filter-chip:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
          border-color: var(--accent-start);
        }
        .ms-filter-chip.active {
          background: var(--accent-gradient);
          color: white;
          border-color: transparent;
          box-shadow: 0 0 16px var(--accent-glow);
        }

        .ms-filter-arrow {
          width: 32px;
          height: 32px;
          border-radius: var(--r-full);
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all var(--t-fast);
          opacity: 0;
        }
        .ms-filters:hover .ms-filter-arrow {
          opacity: 1;
        }
        .ms-filter-arrow:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .ms-filter-arrow {
            display: none;
          }
        }
      `}</style>
    </>
  )
}