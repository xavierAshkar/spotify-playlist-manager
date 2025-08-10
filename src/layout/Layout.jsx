// src/pages/Layout.jsx
export default function Layout({ headerLeft, headerCenter, headerRight, footerLeft, footerCenter, footerRight, children }) {
  return (
    <div
      className="h-screen flex flex-col bg-[#0f0f12] text-white"
      style={{
        // tokens 
        '--header-h': '72px',
        '--footer-h': '80px',
        '--left-w': '260px',
        '--right-w': '344px',
      }}
    >
      {/* Header */}
      <header className="h-[var(--header-h)] shrink-0 border-b border-white/5">
        <div className="h-full grid grid-cols-[var(--left-w)_1fr_var(--right-w)] items-center gap-4 px-4">
          <div className="h-full flex items-center">{headerLeft}</div>
          <div className="h-full flex items-center justify-center">{headerCenter}</div>
          <div className="h-full flex items-center justify-end">{headerRight}</div>
        </div>
      </header>

      {/* Body: sidebars + main */}
      <div className="flex-1 min-h-0 grid grid-cols-[var(--left-w)_1fr_var(--right-w)]">
        {/* Left: History (scrolls independently) */}
        <aside className="min-h-0 overflow-y-auto border-r border-white/5">
          { /* left history content here */ }
        </aside>

        {/* Main content (scrolls) */}
        <main className="min-w-0 min-h-0 overflow-y-auto">
          {children}
        </main>

        {/* Right: Queue (scrolls independently) */}
        <aside className="min-h-0 overflow-y-auto border-l border-white/5">
          { /* right queue content here */ }
        </aside>
      </div>

      {/* Footer */}
      <footer className="h-[var(--footer-h)] shrink-0 border-t border-white/5">
        <div className="h-full grid grid-cols-[var(--left-w)_1fr_var(--right-w)] items-center gap-4 px-4">
          <div className="h-full flex items-center">{footerLeft}</div>
          <div className="h-full flex items-center justify-center">{footerCenter}</div>
          <div className="h-full flex items-center justify-end">{footerRight}</div>
        </div>
      </footer>
    </div>
  );
}
