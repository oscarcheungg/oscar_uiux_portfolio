import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useWeather } from './weather';

/* One digit on an odometer strip: changing it rolls the strip to the new
   number rather than swapping the glyph. */
function Digit({ value }: { value: number }) {
  return (
    <span className="roll" aria-hidden="true">
      <span className="roll__strip" style={{ '--d': value } as CSSProperties}>
        {'0123456789'.split('').map((n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  );
}

/* A time zone's offset from UTC in minutes, at a given moment. */
function offsetMinutes(timeZone: string, at: Date) {
  const name =
    new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(at)
      .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const m = name.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  const minutes = Number(m[2]) * 60 + Number(m[3] ?? 0);
  return m[1] === '-' ? -minutes : minutes;
}

/* "3 hours", "1 hour", "5½ hours", "45 minutes". */
function span(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} minutes`;
  const whole = m === 30 ? `${h}½` : m ? `${h}h ${m}m` : `${h}`;
  return m && m !== 30 ? whole : `${whole} ${h === 1 && !m ? 'hour' : 'hours'}`;
}

/* How the visitor's clock sits against mine, in a sentence — or nothing,
   when we share a time zone. */
function compare(mine: string, theirs: string, at: Date) {
  const diff = offsetMinutes(theirs, at) - offsetMinutes(mine, at);
  if (diff === 0) return '';
  return diff < 0 ? `You're ${span(-diff)} behind me` : `You're ${span(diff)} ahead of me`;
}

/* Where I am, what the sky is doing there, and the time, as a small readout.
   The readout always shows my time. Hovering (or focusing) it opens a card
   underneath with my conditions and temperature, the visitor's own time,
   and how far their clock is from mine. */
export function LocalTime({
  place,
  timeZone,
  coords,
}: {
  place: string;
  timeZone: string;
  coords: { lat: number; lon: number };
}) {
  const [now, setNow] = useState(() => new Date());
  const weather = useWeather(coords);
  const visitorZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || timeZone, [timeZone]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const clock = `${get('hour')}:${get('minute')}:${get('second')}`;
  const label = `${clock} ${get('dayPeriod')} ${get('timeZoneName')}`;
  const offset = compare(timeZone, visitorZone, now);
  const visitorTime = new Intl.DateTimeFormat('en-US', {
    timeZone: visitorZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(now);
  const city = place.split(',')[0];

  return (
    <span className="local-time-wrap">
      <button
        type="button"
        className="local-time"
        aria-describedby="local-time-card"
        aria-label={`${place}, ${label}`}
      >
        <span className="local-time__place">
          {weather && <img className="local-time__sky" src={weather.icon} alt="" width={24} height={24} />}
          {place}
        </span>
        <span className="local-time__clock">
          <time dateTime={now.toISOString()}>
            {[...clock].map((c, i) =>
              /\d/.test(c) ? (
                <Digit key={i} value={Number(c)} />
              ) : (
                <span key={i} className="local-time__colon">
                  {c}
                </span>
              ),
            )}
            <span className="local-time__unit">
              {get('dayPeriod')} {get('timeZoneName')}
            </span>
          </time>
        </span>
      </button>

      <span className="local-time__card" id="local-time-card" role="tooltip">
        {weather && (
          <span className="local-time__line">
            <span className="local-time__strong">{weather.label}</span> · {weather.temp}°F in {city}
          </span>
        )}
        <span className="local-time__line">
          <span className="local-time__strong">Your time</span> · {visitorTime}
        </span>
        {offset && <span className="local-time__line">{offset}</span>}
      </span>
    </span>
  );
}
