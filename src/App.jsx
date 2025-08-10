// src/App.jsx
import Layout from './pages/Layout';
import PlaylistGrid from './pages/PlaylistGrid';
import HeaderLeft from './pages/Header/HeaderLeft';
import HeaderCenter from './pages/Header/HeaderCenter';
import HeaderRight from './pages/Header/HeaderRight';
import FooterLeft from './pages/Footer/FooterLeft';
import FooterCenter from './pages/Footer/FooterCenter';
import FooterRight from './pages/Footer/FooterRight';
import LeftHistory from './pages/LeftHistory';
import RightQueue from './pages/RightQueue';

export default function App() {
  return (
    <Layout
      headerLeft={<HeaderLeft />}
      headerCenter={<HeaderCenter />}
      headerRight={<HeaderRight />}
      footerLeft={<FooterLeft />}
      footerCenter={<FooterCenter />}
      footerRight={<FooterRight />}
    >
      {/* Left & Right go inside the body grid via these components */}
      <div className="h-full grid grid-cols-[var(--left-w)_1fr_var(--right-w)]">
        <div className="min-h-0 overflow-y-auto border-r border-white/5"><LeftHistory /></div>
        <div className="min-w-0 min-h-0 overflow-y-auto"><PlaylistGrid /></div>
        <div className="min-h-0 overflow-y-auto border-l border-white/5"><RightQueue /></div>
      </div>
    </Layout>
  );
}
