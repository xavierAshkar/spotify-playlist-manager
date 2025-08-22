import { useMemo, useState } from "react";
import SongList from "@/components/songs/SongList";

// TEMP mock — replace with live queue data
const mock = {
  previous: [
    { id: "p1", title: "Prev Song", artistsText: "Prev Artist", coverUrl: "", liked: true },
  ],
  current: { id: "c1", title: "Current Song", artistsText: "Artist", coverUrl: "" },
  upcoming: Array.from({ length: 10 }, (_, i) => ({
    id: `u${i}`, title: `Upcoming ${i + 1}`, artistsText: "Artist", coverUrl: "",
  })),
};

export default function QueuePanel() {
  const { previous, current, upcoming } = mock;
  const [mode, setMode] = useState("default"); // "default" | "previous"

  const mostRecentPrevious = useMemo(
    () => (previous[0] ? [previous[0]] : []),
    [previous]
  );

  return (
    <aside className="h-full flex flex-col bg-[#141414]">
      {/* Header / Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <h2 className="text-sm font-semibold text-white/70">Queue</h2>
        <div className="flex items-center gap-2">
          <Btn active={mode === "default"} onClick={() => setMode("default")}>Default</Btn>
          <Btn active={mode === "previous"} onClick={() => setMode("previous")}>Previous</Btn>
        </div>
      </div>

      {mode === "default" ? (
        // Previous → Current → Queue (upcoming scrolls)
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-shrink-0 px-3">
            <SectionTitle>Previous</SectionTitle>
            <SongList songs={mostRecentPrevious} variant="queue" />

            <SectionTitle>Current</SectionTitle>
            <SongList
              songs={[current]}
              variant="queue"
              currentId={current?.id}
              onClickSong={(song) => console.log("clicked current", song)}
              onToggleLike={(song) => console.log("toggle like", song)}
              onOpenPlaylists={(song) => console.log("open playlists", song)}
            />

            <SectionTitle>Queue</SectionTitle>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-3 scrollbar scrollbar-hover">
            <SongList
              songs={upcoming}
              variant="queue"
              onToggleLike={(song) => console.log("toggle like", song)}
              onOpenPlaylists={(song) => console.log("open playlists", song)}
            />
          </div>
        </div>
      ) : (
        // Previous scrolls, current sticky bottom
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto px-3 pt-2 pb-24 scrollbar scrollbar-hover">
            <SectionTitle>Previous</SectionTitle>
            <SongList songs={previous} variant="queue" />
          </div>

          <div className="sticky bottom-0 bg-[#141414] px-3 pt-2 pb-3 border-t border-white/5">
            <SectionTitle>Current</SectionTitle>
            <SongList
              songs={[current]}
              variant="queue"
              currentId={current?.id}
              onToggleLike={(song) => console.log("toggle like", song)}
              onOpenPlaylists={(song) => console.log("open playlists", song)}
            />
          </div>
        </div>
      )}
    </aside>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="px-1 py-2 text-[13px] tracking-wide uppercase text-white/50">
      {children}
    </h3>
  );
}

function Btn({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`px-2.5 py-1.5 rounded text-xs
        ${active ? "bg-white/10 text-white" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"}`}
    >
      {children}
    </button>
  );
}
