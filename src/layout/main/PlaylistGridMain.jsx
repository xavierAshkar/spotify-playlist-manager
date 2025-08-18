// src/layout/main/PlaylistGridMain.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatDurationMs } from "@/lib/time";

async function getJSON(url) {
  const res = await fetch(url, { credentials: "include" });
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON from ${res.url}, got ${res.status} ${ct}\n${text.slice(0,150)}`);
  }
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function PlaylistGridMain() {
  const [me, setMe] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [err, setErr] = useState("");
  const ran = useRef(false);           // avoid double-run in React StrictMode
  const navigate = useNavigate();

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        const s = await fetch("/api/session", { credentials: "include" });
        if (s.status === 401) {
          window.location.href = "/auth/login"; // proxied to Django
          return;
        }
        setMe(await s.json());

        const data = await getJSON("/api/playlists/summary");
        setPlaylists(data.items || []);
      } catch (e) {
        console.error(e);
        setErr("Failed to load playlists.");
      }
    })();
  }, []);

  if (err) return <div className="p-6 text-red-400">{err}</div>;
  if (!me || !playlists) return <div className="p-6 opacity-70">Loading…</div>;

  return (
    <div className="h-full overflow-auto p-6">
      <div className="text-sm opacity-70 mb-3">
        Welcome{me.display_name ? `, ${me.display_name}` : ""}.
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {playlists.map(pl => (
          <button
            key={pl.id}
            className="group text-left rounded-xl p-3 bg-cardBg hover:bg-hoverBg transition-colors"
            onClick={() => navigate(`/playlist/${pl.id}`)}
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg mb-3 bg-neutral-800">
              {pl.image_url ? (
                <img
                  src={pl.image_url}
                  alt={pl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full grid place-items-center text-subtle">
                  Album Cover
                </div>
              )}
            </div>
            <div className="text-main">{pl.name}</div>
            <div className="text-subtle text-xs">
              {pl.tracks_total} songs • {formatDurationMs(pl.total_duration_ms)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
