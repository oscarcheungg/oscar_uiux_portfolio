import { useEffect, useState } from 'react';

/* Current conditions where I am, from Open-Meteo (free, no key). The icons
   are Tabler outline icons (stroke 2), like the rest of the homepage. If the
   request fails the readout simply shows no icon. */

export interface Weather {
  icon: string;
  label: string;
  temp: number;
}

const REFRESH = 15 * 60 * 1000;

/* WMO weather codes → icon and a plain description. */
function describe(code: number, day: boolean): { icon: string; label: string } {
  const sky = (name: string) => `/home/icons/weather/${name}.svg`;
  if (code <= 1) return { icon: sky(day ? 'sun' : 'moon'), label: 'Clear' };
  if (code === 2) return { icon: sky(day ? 'haze' : 'haze-moon'), label: 'Partly cloudy' };
  if (code === 3) return { icon: sky('cloud'), label: 'Overcast' };
  if (code === 45 || code === 48) return { icon: sky('cloud-fog'), label: 'Foggy' };
  if (code >= 51 && code <= 57) return { icon: sky('droplets'), label: 'Drizzle' };
  if (code === 66 || code === 67) return { icon: sky('cloud-snow'), label: 'Freezing rain' };
  if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) return { icon: sky('cloud-rain'), label: 'Rain' };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { icon: sky('snowflake'), label: 'Snow' };
  if (code >= 95) return { icon: sky('cloud-storm'), label: 'Thunderstorms' };
  return { icon: sky(day ? 'sun' : 'moon'), label: 'Clear' };
}

/* The last reading, kept for the whole visit, so moving between pages shows
   the sky straight away instead of fetching it again and popping it in. */
let lastReading: { key: string; weather: Weather; at: number } | null = null;

export function useWeather({ lat, lon }: { lat: number; lon: number }) {
  const key = `${lat},${lon}`;
  const [weather, setWeather] = useState<Weather | null>(() =>
    lastReading && lastReading.key === key ? lastReading.weather : null,
  );

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,is_day,temperature_2m&temperature_unit=fahrenheit`,
        );
        if (!res.ok) return;
        const { current } = await res.json();
        const reading = { ...describe(current.weather_code, current.is_day === 1), temp: Math.round(current.temperature_2m) };
        lastReading = { key, weather: reading, at: Date.now() };
        if (alive) setWeather(reading);
      } catch {
        /* offline or blocked — no icon */
      }
    };
    // A fresh enough reading from an earlier page needs no fetch yet.
    const fresh = lastReading && lastReading.key === key && Date.now() - lastReading.at < REFRESH;
    if (!fresh) load();
    const id = window.setInterval(load, REFRESH);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [lat, lon, key]);

  return weather;
}
