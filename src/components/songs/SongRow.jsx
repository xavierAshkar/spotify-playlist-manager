import { useState } from "react";

// Minimal normalized shape expected by SongRow:
// {
//   id: string,
//   title: string,
//   artistsText: string,    // "Artist A, Artist B"
//   coverUrl?: string,
//   durationMs?: number,
//   liked?: boolean,
// }
export default function SongRow({
  song,
  variant = "default", // "default" | "queue" | "playlist"
  isCurrent = false,

  // Optional actions
  onClick,
  onToggleLike,
  onOpenPlaylists,
}) {
  const [hover, setHover] = useState(false);

  return (
    <li
      className={`p-3 rounded-lg transition-colors cursor-default select-none
        ${isCurrent ? "bg-white/10" : "bg-cardBg hover:bg-hoverBg"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {song.coverUrl && (
          <img src={song.coverUrl} alt="" className="w-12 h-12 rounded object-cover" />
        )}

        <div className="min-w-0 flex-1">
          <div className="text-main truncate">{song.title}</div>
          <div className="text-subtle text-sm truncate">{song.artistsText}</div>
        </div>

        {/* Right-side meta (playlist view may show duration, features later) */}
        {variant === "playlist" && song.durationMs != null && (
          <div className="text-subtle text-sm tabular-nums">
            {formatDurationMs(song.durationMs)}
          </div>
        )}

        {/* Hover actions (like / playlists) */}
        {hover && (
          <div className="flex items-center gap-2">
            {onToggleLike && (
              <button
                className={`w-8 h-8 grid place-items-center rounded hover:bg-white/10
                  ${song.liked ? "text-white" : "text-subtle"}`}
                aria-label="Toggle like"
                onClick={(e) => { e.stopPropagation(); onToggleLike(song); }}
              >
                {/* Heart icon placeholder — swap for your SVG */}
                <span>❤</span>
              </button>
            )}
            {onOpenPlaylists && (
              <button
                className="w-8 h-8 grid place-items-center rounded text-subtle hover:text-white hover:bg-white/10"
                aria-label="Manage playlists"
                onClick={(e) => { e.stopPropagation(); onOpenPlaylists(song); }}
              >
                {/* Playlist icon placeholder */}
                <span>⋯</span>
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

function formatDurationMs(ms) {
  const total = Math.floor((ms || 0) / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
