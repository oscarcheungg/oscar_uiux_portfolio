// Fetches the latest Strava activity and writes public/strava-activity.json.
// Run by .github/workflows/strava.yml on a schedule. Needs three env vars:
//   STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN
// (stored as GitHub Actions secrets — never commit them).

import { writeFileSync } from 'node:fs';

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
  console.error('Missing STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET / STRAVA_REFRESH_TOKEN');
  process.exit(1);
}

// 1) Exchange the refresh token for a short-lived access token.
const tokenRes = await fetch('https://www.strava.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: STRAVA_REFRESH_TOKEN,
  }),
});
if (!tokenRes.ok) {
  console.error('Token refresh failed:', tokenRes.status, await tokenRes.text());
  process.exit(1);
}
const { access_token } = await tokenRes.json();

// 2) Grab the most recent RUN. Strava has no type filter on this endpoint, so
//    page through recent activities and take the first Run (includes trail/
//    virtual runs). Scans up to ~200 recent activities before giving up.
let a = null;
const RUN_TYPES = new Set(['Run', 'TrailRun', 'VirtualRun']);
for (let page = 1; page <= 2 && !a; page++) {
  const actRes = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=${page}`,
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
  if (!actRes.ok) {
    console.error('Activities fetch failed:', actRes.status, await actRes.text());
    process.exit(1);
  }
  const activities = await actRes.json();
  if (activities.length === 0) break;
  a = activities.find((act) => RUN_TYPES.has(act.type) || RUN_TYPES.has(act.sport_type));
}
if (!a) {
  console.error('No recent runs found.');
  process.exit(1);
}

// 3) Write only the fields the card needs (no tokens, no private data).
const out = {
  name: a.name,
  distance: a.distance,
  moving_time: a.moving_time,
  total_elevation_gain: a.total_elevation_gain,
  polyline: a.map?.summary_polyline || '',
  start_date_local: a.start_date_local,
  fetched_at: new Date().toISOString(),
};

writeFileSync('public/strava-activity.json', JSON.stringify(out, null, 2) + '\n');
console.log('Wrote public/strava-activity.json —', out.name, `(${(out.distance / 1609.344).toFixed(1)} mi)`);
