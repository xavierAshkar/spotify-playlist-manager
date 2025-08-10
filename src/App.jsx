// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PlaylistDetailsPage from './pages/PlaylistDetailsPage';
import PlaylistGridPage from './pages/PlaylistGridPage';
import SearchResultsPage from './pages/SearchResultsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/playlists" replace />} />
        <Route path="/playlists" element={<PlaylistGridPage />} />
        <Route path="/playlist/:id" element={<PlaylistDetailsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
