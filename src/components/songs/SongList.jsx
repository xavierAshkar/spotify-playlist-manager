import SongRow from "./SongRow";

export default function SongList({
  songs,
  variant = "default",
  currentId,
  onClickSong,
  className = "",
}) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {songs.map((song, i) => (
        <SongRow
          key={song.id ?? i}
          song={song}
          variant={variant}
          isCurrent={song.id && song.id === currentId}
          onClick={onClickSong ? () => onClickSong(song, i) : undefined}
        />
      ))}
    </ul>
  );
}
