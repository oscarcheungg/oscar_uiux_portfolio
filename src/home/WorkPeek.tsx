import { useCallback, useEffect, useRef, useState } from 'react';
import { ProjectCover } from '../components/ProjectCover';
import type { WorkItem } from './config';

/* A preview of a project beside the Selected work list while its row is
   hovered: a large rounded card with the project's own cover (its painted
   ground and screens), fading in level with the row. Moving down the list
   glides the card to the next row and swaps the cover in place; leaving the
   list fades it out. It stays anchored beside the list rather than chasing
   the cursor.

   Only on wide windows with a mouse — there's no room beside the list
   otherwise, and nothing to hover on touch. */

const WIDTH = 460;
const HEIGHT = (WIDTH * 3) / 4;
const GAP = 40; // from the list's right edge to the card
const MARGIN = 24; // never closer than this to the window's top or bottom

export function useWorkPeek() {
  const [peek, setPeek] = useState<{ item: WorkItem; left: number; top: number } | null>(null);
  // Leaving one row and entering the next happen back to back; hiding waits a
  // moment so the card glides to the next project instead of blinking.
  const hideTimer = useRef<number>();
  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const show = useCallback((item: WorkItem, row: HTMLElement) => {
    window.clearTimeout(hideTimer.current);
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) return;
    const list = row.closest('.fold')?.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    if (!list) return;
    // Level with the row, nudged up a little so the row sits near the card's
    // top third, and kept inside the window.
    const top = Math.min(Math.max(r.top - HEIGHT * 0.2, MARGIN), window.innerHeight - HEIGHT - MARGIN);
    setPeek({ item, left: list.right + GAP, top });
  }, []);

  const hide = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setPeek(null), 90);
  }, []);

  return { peek, show, hide };
}

export function WorkPeek({ peek }: { peek: { item: WorkItem; left: number; top: number } | null }) {
  // The last shown project stays mounted while the card fades out, so the
  // fade shows it rather than an empty card.
  const [last, setLast] = useState(peek);
  if (peek && peek !== last) setLast(peek);
  const shown = last;
  if (!shown) return null;

  return (
    <div
      className="work-peek"
      data-on={!!peek}
      aria-hidden="true"
      style={{ left: shown.left, top: shown.top, width: WIDTH, height: HEIGHT }}
    >
      <div className="work-peek__inner group" key={shown.item.slug}>
        <ProjectCover cover={shown.item.cover} showArt />
      </div>
    </div>
  );
}
