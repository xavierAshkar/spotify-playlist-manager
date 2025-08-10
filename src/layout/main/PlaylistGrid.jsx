// src/pages/PlaylistGrid.jsx
export default function PlaylistGrid() {
  return (
    <div className="p-6">
      <div
        className="grid gap-4 justify-center max-w-[1200px] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white/5 rounded-2xl p-3">
            <div className="aspect-square rounded-xl bg-green-600/60 mb-3" />
            <div className="text-sm truncate">Album {i + 1}</div>
            <div className="text-xs text-white/60 truncate">Artist</div>
          </div>
        ))}
      </div>
    </div>
  );
}
