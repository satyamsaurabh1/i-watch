// components/Layout.jsx
import Navbar from './navbar'
import Sidebar from './sidebar'

export default function Layout({ children }) {
  return (
    <>
      <div className="ms-app">
        <Navbar />
        <div className="ms-body">
          <Sidebar />
          <main className="ms-main">
            {children}
          </main>
        </div>
      </div>

      <style>{`
        .ms-app {
          min-height: 100vh;
          background: var(--bg-deep);
        }
        .ms-body {
          display: flex;
        }
        .ms-main {
          flex: 1;
          padding: var(--sp-xl) var(--sp-2xl);
          min-height: calc(100vh - var(--navbar-h));
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          .ms-main {
            padding: var(--sp-lg);
          }
        }
      `}</style>
    </>
  )
}