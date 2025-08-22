// src/pages/Layout.jsx
export default function Layout({
  headerLeft, headerCenter, headerRight,
  left, main, right,
  footerLeft, footerCenter, footerRight,
}) {
  return (
    <div
      className="h-screen flex flex-col bg-darkBg text-textMain"
      style={{
        // tokens 
        '--header-h': '72px',
        '--footer-h': '80px',
        '--left-w': '260px',
        '--right-w': '344px',
      }}
    >
      {/* Header */}
      <header className="h-[var(--header-h)] shrink-0 border-b border-lightBg">
        <div className="h-full grid grid-cols-[var(--left-w)_1fr_var(--right-w)] items-center px-2">
          <div className="h-full flex items-center justify-center">{headerLeft}</div>
          <div className="h-full flex items-center justify-center">{headerCenter}</div>
          <div className="h-full flex items-center justify-center">{headerRight}</div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 min-h-0 grid grid-cols-[var(--left-w)_1fr_var(--right-w)] overflow-hidden">
        <aside className="min-h-0 overflow-y-auto custom-scrollbar border-r border-lightBg">{left}</aside>
        <main className="min-w-0 min-h-0 overflow-y-auto scrollbar scrollbar-hover">
          {main}
        </main>
        <aside className="min-h-0 overflow-y-auto custom-scrollbar border-l border-lightBg">{right}</aside>
      </div>

      {/* Footer */}
      <footer className="h-[var(--footer-h)] shrink-0 border-t border-lightBg">
        <div className="h-full grid grid-cols-[var(--left-w)_1fr_var(--right-w)] items-center px-2">
          <div className="h-full flex items-center justify-center">{footerLeft}</div>
          <div className="h-full flex items-center justify-center">{footerCenter}</div>
          <div className="h-full flex items-center justify-center">{footerRight}</div>
        </div>
      </footer>
    </div>
  );
}
