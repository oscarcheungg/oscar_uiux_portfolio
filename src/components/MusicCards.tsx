import { useEffect, useRef, useState } from 'react';
import './music-cards.css';

/* Music on the About page: a small record player and a favourite album,
   inspired by the music cards on atom63.io and redrawn for this site.

   The player holds one song. Its record sits 12px below the top of the card over
   a blurred, darkened wash of the cover, with the title and artist centred
   beneath and a row of round glass controls: back to the start, play, and
   open in Apple Music. Play starts the song's official 30-second preview
   and the record turns while it plays; a hairline along the bottom fills
   as it goes. The album card is its cover, with the title and artist in
   white over a soft shade along the bottom, and opens the album. */

export interface Track {
  title: string;
  artist: string;
  cover: string;
  preview: string;
  link: string;
}

export interface Album {
  title: string;
  artist: string;
  year: string;
  cover: string;
  link: string;
}

export function RecordPlayer({ track }: { track: Track }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [at, setAt] = useState(0);
  const [length, setLength] = useState(30);

  // The audio is made on first play, so nothing downloads until asked.
  const get = () => {
    if (!audio.current) {
      const a = new Audio(track.preview);
      a.preload = 'auto';
      a.addEventListener('loadedmetadata', () => setLength(a.duration || 30));
      a.addEventListener('timeupdate', () => setAt(a.currentTime));
      a.addEventListener('play', () => setPlaying(true));
      a.addEventListener('pause', () => setPlaying(false));
      a.addEventListener('ended', () => {
        a.currentTime = 0;
        setAt(0);
      });
      audio.current = a;
    }
    return audio.current;
  };

  // Stop the song when leaving the page.
  useEffect(
    () => () => {
      audio.current?.pause();
      audio.current = null;
    },
    [],
  );

  const toggle = () => {
    const a = get();
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  };

  const restart = () => {
    const a = get();
    a.currentTime = 0;
    setAt(0);
  };

  return (
    <div className="music-card player" data-playing={playing || undefined}>
      <img className="player__wash" src={track.cover} alt="" aria-hidden="true" />

      {/* The record, its label the cover. */}
      <div className="player__record" aria-hidden="true">
        <img className="player__label" src={track.cover} alt="" />
      </div>

      <div className="player__info">
        <span className="player__title">{track.title}</span>
        <span className="player__artist">{track.artist}</span>
      </div>

      <span className="player__bar" aria-hidden="true">
        <span className="player__fill" style={{ width: `${(at / length) * 100}%` }} />
      </span>

      <div className="player__controls">
        <button type="button" className="player__button" onClick={restart} aria-label="Back to the start" data-sound="off">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 6v12M18 6l-8 6 8 6V6z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="player__button player__button--play"
          onClick={toggle}
          aria-label={playing ? `Pause ${track.title}` : `Play a preview of ${track.title}`}
          data-sound="off"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="6.5" y="5" width="3.6" height="14" rx="1" fill="currentColor" />
              <rect x="13.9" y="5" width="3.6" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />
            </svg>
          )}
        </button>
        <a
          className="player__button"
          href={track.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${track.title} in Apple Music`}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M8 16 16 8M9 8h7v7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export function AlbumCard({ album }: { album: Album }) {
  return (
    <a className="music-card album" href={album.link} target="_blank" rel="noreferrer">
      <img className="album__cover" src={album.cover} alt={`${album.title} by ${album.artist}, album cover`} loading="lazy" />
      <span className="album__text">
        <span className="album__title">
          {album.title}
          <span className="music-card__out" aria-hidden="true">
            ↗
          </span>
        </span>
        <span className="album__artist">
          {album.artist} · {album.year}
        </span>
      </span>
    </a>
  );
}
