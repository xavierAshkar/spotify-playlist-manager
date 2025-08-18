// src/layout/main/PlaylistDetailsMain.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJSON } from "@/lib/api";
import { formatDurationMs } from "@/lib/time";

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

      <ul className="space-y-2">
        {items.map((it, i) => {
          const t = it.track || {};
          const art = t.album?.images?.[2]?.url || t.album?.images?.[0]?.url;
          const artists = (t.artists || []).map(a => a.name).join(", ");
          return (
            <li key={t.id ?? i} className="p-3 rounded-lg bg-cardBg hover:bg-hoverBg transition-colors">
              <div className="flex items-center gap-3">
                {art && <img src={art} alt="" className="w-12 h-12 rounded object-cover" />}
                <div className="min-w-0 flex-1">
                  <div className="text-main truncate">{t.name}</div>
                  <div className="text-subtle text-sm truncate">{artists}</div>
                </div>
                <div className="text-subtle text-sm">{formatDurationMs(t.duration_ms || 0)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
