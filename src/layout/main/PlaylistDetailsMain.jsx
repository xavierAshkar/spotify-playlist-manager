// src/layout/main/PlaylistDetailsMain.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJSON } from "@/lib/api";
import { formatDurationMs } from "@/lib/time";
import SongList from "@/components/songs/SongList";

function toSongRowData(track) {
  if (!track) return null;
  const art = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url;
  return {
    id: track.id,
    title: track.name,
    artistsText: (track.artists || []).map(a => a.name).join(", "),
    coverUrl: art,
    durationMs: track.duration_ms,
  };
}

export default function PlaylistDetailsMain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pl, setPl] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await getJSON("/api/session"); // ensures cookie/session
        const data = await getJSON(`/api/playlists/${id}`);
        setPl(data);
      } catch (e) {
        console.error(e);
        setErr("Failed to load playlist.");
      }
    })();
  }, [id]);

  if (err) return <div className="p-6 text-red-400">{err}</div>;
  if (!pl) return <div className="p-6 opacity-70">Loading…</div>;

  const cover = pl.images?.[0]?.url;
  const owner = pl.owner?.display_name ?? "Unknown";
  const items = pl.tracks?.items ?? [];
  const totalMs = items.reduce((sum, it) => sum + (it?.track?.duration_ms || 0), 0);

  // normalize to SongList shape
  const songs = items.map(it => toSongRowData(it.track)).filter(Boolean);

  return (
    <div className="h-full overflow-auto p-6">
      <button className="text-subtle mb-4 hover:underline" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="flex items-center gap-4 mb-6">
        {cover && <img src={cover} alt="" className="w-28 h-28 rounded-lg object-cover" />}
        <div>
          <div className="text-heading">Playlist</div>
          <div className="text-main text-2xl">{pl.name}</div>
          <div className="text-subtle">
            by {owner} • {items.length} tracks • {formatDurationMs(totalMs)}
          </div>
        </div>
      </div>

      {/* shared list renderer */}
      <SongList
        songs={songs}
        variant="playlist"         // shows duration when provided
        className="space-y-2"
      />
    </div>
  );
}
