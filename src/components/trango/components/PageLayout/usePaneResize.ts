"use client";

import { useCallback, useEffect, useRef } from "react";

const DEFAULT_WIDTH_VAR = "--page-layout-pane-width";
/** Pixels per arrow key press. */
const KEY_STEP = 3;

const toPx = (value: string, fallback: number) =>
  value.endsWith("px") ? parseFloat(value) : fallback;

function readStoredWidth(key: string | undefined) {
  try {
    const stored = key ? Number(window.localStorage.getItem(key)) : 0;
    return stored > 0 ? stored : null;
  } catch {
    return null;
  }
}

function storeWidth(key: string, width: number | null) {
  try {
    if (width === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, String(width));
  } catch {
    // Storage is unavailable (private mode, quota): the width just is not remembered.
  }
}

/** Current width and limits of the pane. The limits are its CSS `min-width` / `max-width`. */
function measure(pane: HTMLElement, handle: HTMLElement) {
  const rect = pane.getBoundingClientRect();
  const style = getComputedStyle(pane);
  return {
    width: rect.width,
    min: toPx(style.minWidth, 0),
    max: toPx(style.maxWidth, window.innerWidth),
    // 1 when the handle is on the pane's right edge (moving right widens it), -1 on its left.
    direction: handle.getBoundingClientRect().left > rect.left + rect.width / 2 ? 1 : -1,
  };
}

export interface UsePaneResizeOptions {
  /** Whether the pane renders a resize handle. */
  enabled: boolean;
  /** localStorage key the width is saved under. Not saved when omitted. */
  storageKey?: string;
  /** CSS variable on the pane that carries the resized width. */
  widthVar?: string;
}

/**
 * Behaviour of the pane's resize handle: pointer drag, arrow keys, Home / End and double-click
 * reset. The width goes straight to a CSS variable on the pane and the `aria-value*` attributes
 * of the handle, so dragging never re-renders the pane's children.
 */
export function usePaneResize({
  enabled,
  storageKey,
  widthVar = DEFAULT_WIDTH_VAR,
}: UsePaneResizeOptions) {
  const paneRef = useRef<HTMLElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; width: number; direction: number } | null>(null);

  /** Sets the pane width (`null` restores the recipe's width) and updates the handle's values. */
  const setWidth = useCallback(
    (next: number | null, persist: boolean) => {
      const pane = paneRef.current;
      const handle = handleRef.current;
      if (!pane || !handle) return;

      const { min, max } = measure(pane, handle);
      const width = next === null ? null : Math.round(Math.min(Math.max(next, min), max));
      if (width === null) pane.style.removeProperty(widthVar);
      else pane.style.setProperty(widthVar, `${width}px`);

      handle.setAttribute("aria-valuemin", String(Math.round(min)));
      handle.setAttribute("aria-valuemax", String(Math.round(max)));
      handle.setAttribute("aria-valuenow", String(Math.round(pane.getBoundingClientRect().width)));
      if (persist && storageKey) storeWidth(storageKey, width);
    },
    [storageKey, widthVar],
  );

  // Applied after mount, so the server markup and the first client render match.
  useEffect(() => {
    if (!enabled) return;
    setWidth(readStoredWidth(storageKey), false);

    // The limits follow the viewport: keep the width inside them and the values current.
    const onResize = () => {
      const current = parseFloat(paneRef.current?.style.getPropertyValue(widthVar) ?? "");
      setWidth(Number.isNaN(current) ? null : current, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [enabled, storageKey, widthVar, setWidth]);

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !paneRef.current) return;
    drag.current = null;
    event.currentTarget.removeAttribute("data-dragging");
    setWidth(paneRef.current.getBoundingClientRect().width, true);
  };

  const handleProps = {
    ref: handleRef,
    onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
      if (event.button !== 0 || !paneRef.current) return;
      event.preventDefault();
      event.currentTarget.focus();
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.setAttribute("data-dragging", "");
      const { width, direction } = measure(paneRef.current, event.currentTarget);
      drag.current = { x: event.clientX, width, direction };
    },
    onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
      const start = drag.current;
      if (start) setWidth(start.width + (event.clientX - start.x) * start.direction, false);
    },
    onPointerUp: endDrag,
    onLostPointerCapture: endDrag,
    onDoubleClick: () => setWidth(null, true),
    onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (!paneRef.current) return;
      const { width, min, max, direction } = measure(paneRef.current, event.currentTarget);
      const targets: Record<string, number> = {
        ArrowLeft: width - KEY_STEP * direction,
        ArrowRight: width + KEY_STEP * direction,
        Home: min,
        End: max,
      };
      if (!(event.key in targets)) return;
      event.preventDefault();
      setWidth(targets[event.key], true);
    },
  };

  return { paneRef, handleProps };
}
