// src/layout/header/HeaderCenter.jsx
import { useRef, useEffect } from "react";

import LibraryIcon from "@/assets/icons/library.svg?react";
import SpotifyIcon from "@/assets/icons/spotify.svg?react";
import HeartIcon   from "@/assets/icons/heart.svg?react";

function ScopeIcon({ scope }) {
  if (scope === "Library") return <LibraryIcon className="w-[32px] h-[32px]" />;
  if (scope === "Liked")   return <HeartIcon   className="w-[32px] h-[32px]" />;
  // default: All of Spotify
  return <SpotifyIcon className="w-[32px] h-[32px]" />;
}

export default function HeaderCenter({
  scope = "All",            // "All" | "Library" | "Liked"
  onToggleScope,
  onSearch,
  placeholder = "Find an artist, album, or song...",
}) {
  const inputRef = useRef(null);

  // "/" or Cmd/Ctrl+K focuses search
  useEffect(() => {
    const h = (e) => {
      if (e.key === "/" || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="h-full w-full px-4 flex items-center gap-[12px] justify-center">
      {/* Search pill (w=460, h=46 pre-hover) */}
      <div className="group w-[600px]">
        <div
          className="
            h-[46px] w-full px-[14px]
            rounded-full bg-lightBg hover:bg-hoverBg
            flex items-center gap-[10px]
            transform-gpu will-change-transform
            transition-transform duration-150 ease-out
            hover:scale-[1.008]
          "
        >
          {/* search icon */}
          <svg
            className="w-5 h-5 text-textSubtle group-hover:text-textMain transition-colors"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="
              flex-1 bg-transparent outline-none
              text-heading placeholder:text-textSubtle
              group-hover:text-textMain group-hover:font-bold transition-colors duration-150
            "
          />
          <kbd className="text-subtle px-2 py-0.5 rounded border border-lightBg">/</kbd>
        </div>
      </div>

      {/* Round scope button (46x46 pre-hover) */}
      <button
        type="button"
        onClick={onToggleScope}
        className="
          group h-[46px] w-[60px] rounded-full
          bg-lightBg hover:bg-hoverBg
          grid place-items-center
          transform-gpu will-change-transform
          transition-transform duration-150 ease-out
          hover:scale-[1.05]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40
        "
        aria-label="Change search scope"
        title={scope === "All" ? "All of Spotify" : scope}
      >
        <span className="text-textSubtle group-hover:text-textMain [&_*]:fill-current [&_*]:stroke-current">
          <ScopeIcon scope={scope} />
        </span>
      </button>
    </div>
  );
}
