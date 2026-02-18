// pages/Home.jsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchTrending, searchVideos } from '../lib/api'
import VideoCard from '../components/VideoCard'
import Pagination from '../components/Pagination'

export default function Home() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [pageToken, setPageToken] = useState('')
  const [nextPageToken, setNextPageToken] = useState('')
  const [prevPageTokens, setPrevPageTokens] = useState({}) // Store tokens for each page { 1: '', 2: 'token...' }

  // Reset when search query changes
  useEffect(() => {
    setCurrentPage(1)
    setPageToken('')
    setNextPageToken('')
    setPrevPageTokens({})
    setVideos([])
    setError(null)
  }, [query])

  // Fetch videos when pageToken or query changes
  useEffect(() => {
    let mounted = true

    const loadVideos = async () => {
      setLoading(true)
      setError(null)
      try {
        let results, newNextToken

        if (query) {
          const data = await searchVideos(query, 12, pageToken)
          results = data.videos || data
          newNextToken = data.nextPageToken || ''
        } else {
          const data = await fetchTrending(12, pageToken)
          results = data.videos || data
          newNextToken = data.nextPageToken || ''
        }

        if (mounted) {
          const uniqueVideos = results.filter((video, index, self) =>
            index === self.findIndex(v => v.id === video.id)
          )
          setVideos(uniqueVideos)
          setNextPageToken(newNextToken)

          // Scroll to top on page change
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch (err) {
        console.error('Failed to load videos:', err)
        if (mounted) setError('Failed to load videos. Please try again.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadVideos()
    return () => { mounted = false }
  }, [query, pageToken])

  const handleNextPage = () => {
    if (nextPageToken) {
      setPrevPageTokens(prev => ({ ...prev, [currentPage + 1]: nextPageToken }))
      setPageToken(nextPageToken)
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevToken = prevPageTokens[currentPage - 1] || ''
      setPageToken(prevToken) // Logic might need adjustment, technically we need the token that logic *produced* the previous page? 
      // Actually, YouTube API prevPageToken is returned in response too, but existing api.js might not capture it well or we can just use cached tokens.
      // Our api.js DOES return prevPageToken. Let's stick to our manual cache or use API's.
      // Manual cache is safer for "page number" consistency.
      // Wait, if we are on Page 2, to go to Page 1 we need the token that opened Page 1 (which is empty string).
      // My `prevPageTokens` logic: 
      // Page 1: token '' -> Next -> gets 'tokenA'
      // Page 2: token 'tokenA'
      // So `prevPageTokens` should map Page Number -> Token required to fetch it.
      // { 1: '', 2: 'tokenA', 3: 'tokenB' }

      // Let's refine handleNextPage to store the token for the *upcoming* page.
      // Actually, cleaner: store tokens map: { [page]: [token] }
      // Initial: { 1: '' }

      const targetPage = currentPage - 1
      const targetToken = prevPageTokens[targetPage] || ''
      // If we rely on `prevPageTokens` state, we must ensure it's populated correctly in Next.

      setPageToken(targetToken)
      setCurrentPage(targetPage)
    }
  }

  // Adjusted Next Page Logic to match token map strategy
  const handleNext = () => {
    if (nextPageToken) {
      const nextPage = currentPage + 1
      setPrevPageTokens(prev => ({ ...prev, [nextPage]: nextPageToken }))
      setPageToken(nextPageToken)
      setCurrentPage(nextPage)
    }
  }



  return (
    <>
      <div className="ms-home">
        {/* Search header */}
        {query && !loading && (
          <div className="ms-search-header">
            <span className="ms-search-label">Results for</span>
            <span className="ms-search-query">"{query}"</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="ms-error glass">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="var(--danger)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-gradient">
              Try Again
            </button>
          </div>
        )}

        {/* Skeleton Loading */}
        {loading && (
          <div className="ms-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="ms-skeleton-card">
                <div className="skeleton ms-skel-thumb" />
                <div className="ms-skel-info">
                  <div className="skeleton ms-skel-avatar" />
                  <div className="ms-skel-text">
                    <div className="skeleton ms-skel-line ms-skel-line-1" />
                    <div className="skeleton ms-skel-line ms-skel-line-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {!loading && videos.length > 0 && (
          <div className="ms-grid">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && videos.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onNext={handleNext}
            onPrev={handlePrevPage}
            hasNext={!!nextPageToken}
            hasPrev={currentPage > 1}
          />
        )}

        {/* End message */}


        {/* No results */}
        {!loading && videos.length === 0 && !error && (
          <div className="ms-no-results">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="var(--text-muted)">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <h3>No videos found</h3>
            {query && <p>Try different keywords or check back later</p>}
          </div>
        )}
      </div>

      <style>{`
        .ms-home {
          max-width: 1600px;
          margin: 0 auto;
        }

        .ms-search-header {
          display: flex;
          align-items: baseline;
          gap: var(--sp-sm);
          margin-bottom: var(--sp-xl);
          padding-bottom: var(--sp-lg);
          border-bottom: 1px solid var(--glass-border);
        }
        .ms-search-label {
          font-size: 14px;
          color: var(--text-muted);
        }
        .ms-search-query {
          font-size: 18px;
          font-weight: 600;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: var(--sp-xl) var(--sp-lg);
        }

        /* Skeleton */
        .ms-skeleton-card {
          display: flex;
          flex-direction: column;
          gap: var(--sp-md);
        }
        .ms-skel-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: var(--r-lg);
        }
        .ms-skel-info {
          display: flex;
          gap: var(--sp-md);
        }
        .ms-skel-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--r-full);
          flex-shrink: 0;
        }
        .ms-skel-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--sp-sm);
        }
        .ms-skel-line {
          height: 12px;
          border-radius: var(--r-sm);
        }
        .ms-skel-line-1 { width: 90%; }
        .ms-skel-line-2 { width: 60%; }



        .ms-end-msg {
          text-align: center;
          padding: var(--sp-3xl) 0;
          color: var(--text-muted);
          font-size: 14px;
          border-top: 1px solid var(--glass-border);
          margin-top: var(--sp-xl);
        }

        /* Error */
        .ms-error {
          text-align: center;
          padding: var(--sp-3xl);
          border-radius: var(--r-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-lg);
          margin: var(--sp-xl) 0;
        }
        .ms-error p {
          color: var(--text-secondary);
          font-size: 15px;
        }

        /* No results */
        .ms-no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--sp-lg);
          padding: 80px 0;
          text-align: center;
        }
        .ms-no-results h3 {
          color: var(--text-primary);
          font-size: 20px;
        }
        .ms-no-results p {
          color: var(--text-muted);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .ms-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-xl);
          }
        }
      `}</style>
    </>
  )
}