import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { decodePolyline } from '../utils/polyline';

/**
 * Latest Strava run as a full-bleed route map with a stats panel, styled after
 * mchiu.co.uk. Fed by a static /strava-activity.json that a scheduled GitHub
 * Action keeps fresh. Leaflet loads from a CDN at runtime (out of the build).
 */

const ATHLETE_URL = 'https://www.strava.com/athletes/16395296607';
const STRAVA_ORANGE = '#fc4c02';

interface Activity {
  name: string;
  distance: number; // meters
  moving_time?: number; // seconds
  total_elevation_gain?: number; // meters
  polyline: string;
  start_date_local: string;
  fetched_at?: string;
}

// ---- Leaflet CDN loader (once) ----
let leafletPromise: Promise<any> | null = null;
function loadLeaflet(): Promise<any> {
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve) => {
    if ((window as any).L) return resolve((window as any).L);
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      link.setAttribute('data-leaflet', '');
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.async = true;
    script.onload = () => resolve((window as any).L);
    script.onerror = () => resolve(undefined);
    document.body.appendChild(script);
  });
  return leafletPromise;
}

const isDark = () => document.documentElement.classList.contains('dark');
const tileUrl = (dark: boolean) =>
  `https://{s}.basemaps.cartocdn.com/${dark ? 'dark_nolabels' : 'light_nolabels'}/{z}/{x}/{y}{r}.png`;

function miles(m: number) {
  return m / 1609.344;
}
function formatDistance(m: number) {
  return `${miles(m).toFixed(2)} mi`;
}
function formatDuration(sec?: number) {
  if (!sec) return '—';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`;
}
function formatPace(distanceM: number, sec?: number) {
  const mi = miles(distanceM);
  if (!sec || mi < 0.01) return '—';
  const perMile = sec / mi;
  const m = Math.floor(perMile / 60);
  const s = Math.round(perMile % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d);
}

function StravaMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={STRAVA_ORANGE} aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.7rem] text-neutral-400 dark:text-neutral-500 leading-none mb-1">{label}</p>
      <p className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-50 tabular-nums leading-none truncate">
        {value}
      </p>
    </div>
  );
}

export function StravaCard() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch('/strava-activity.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Activity) => setActivity(data))
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    if (!activity?.polyline || !mapRef.current) return;
    let map: any;
    let tiles: any;
    let observer: MutationObserver | undefined;
    let cancelled = false;

    loadLeaflet().then((L) => {
      if (!L || cancelled || !mapRef.current) return;
      const coords = decodePolyline(activity.polyline);
      if (coords.length === 0) return;

      map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
      });
      tiles = L.tileLayer(tileUrl(isDark()), { subdomains: 'abcd', maxZoom: 19 }).addTo(map);
      const line = L.polyline(coords, { color: STRAVA_ORANGE, weight: 3.5, opacity: 1 }).addTo(map);
      map.fitBounds(line.getBounds(), { padding: [30, 30] });
      setTimeout(() => map.invalidateSize(), 60);

      // swap map tiles when the site theme toggles
      observer = new MutationObserver(() => tiles.setUrl(tileUrl(isDark())));
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    });

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (map) map.remove();
    };
  }, [activity]);

  return (
    <a
      href={ATHLETE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={activity ? `${activity.name} on Strava` : 'My latest run on Strava'}
      className="group relative isolate block min-h-[400px] md:min-h-[512px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
    >
      {/* Full-bleed route map (z-0 contains Leaflet's internal pane z-indexes) */}
      <div
        ref={mapRef}
        className="absolute inset-0 z-0 [&_.leaflet-container]:bg-neutral-100 dark:[&_.leaflet-container]:bg-neutral-800"
      />

      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
          view my activity on Strava
        </div>
      )}

      {/* Strava badge — top-left */}
      <div className="absolute z-10 top-4 left-4 w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm flex items-center justify-center">
        <StravaMark className="w-5 h-5" />
      </div>

      {/* External-link chip — top-right, fades in on hover */}
      <div className="absolute z-10 top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <ArrowUpRight className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
      </div>

      {/* Stats panel — bottom */}
      {activity && !failed && (
        <div className="absolute z-10 inset-x-3 bottom-3 rounded-xl bg-white/95 dark:bg-neutral-900/90 backdrop-blur shadow-sm px-4 py-3.5">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-3">
            {formatDate(activity.start_date_local)}
          </p>
          <div className="grid grid-cols-4 gap-3">
            <Stat label="distance" value={formatDistance(activity.distance)} />
            <Stat label="pace" value={`${formatPace(activity.distance, activity.moving_time)} /mi`} />
            <Stat label="time" value={formatDuration(activity.moving_time)} />
            <Stat
              label="elev"
              value={
                activity.total_elevation_gain != null
                  ? `${Math.round(activity.total_elevation_gain)} m`
                  : '—'
              }
            />
          </div>
        </div>
      )}
    </a>
  );
}
