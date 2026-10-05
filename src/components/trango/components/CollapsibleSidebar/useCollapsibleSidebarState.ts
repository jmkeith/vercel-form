"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

// Every sidebar's state lives in one localStorage entry, as `{ [storageKey]: expanded }`.
const STORAGE_KEY = "sidebar_expanded";

type Stored = Record<string, boolean>;

const EMPTY: Stored = {};
const listeners = new Set<() => void>();
let cache: Stored | null = null;

function read(): Stored {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return EMPTY;
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, boolean] => typeof entry[1] === "boolean"),
    );
  } catch {
    return EMPTY;
  }
}

const getSnapshot = () => (cache ??= read());
const getServerSnapshot = () => EMPTY;

function write(next: Stored) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage is unavailable (private mode, quota): the state just is not remembered.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  // Another tab changed the entry: drop the cache and re-read.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export interface UseCollapsibleSidebarStateOptions {
  /** Remembers the state in localStorage under this key. Not remembered when omitted. */
  storageKey?: string;
  /** State when nothing is remembered. */
  defaultExpanded?: boolean;
}

export interface CollapsibleSidebarState {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  toggle: () => void;
}

/**
 * Expanded state for a `CollapsibleSidebar`, optionally remembered across visits. The server and
 * the first client render use `defaultExpanded`; a remembered value applies right after.
 */
export function useCollapsibleSidebarState({
  storageKey,
  defaultExpanded = true,
}: UseCollapsibleSidebarStateOptions = {}): CollapsibleSidebarState {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [local, setLocal] = useState(defaultExpanded);
  const expanded = storageKey ? (stored[storageKey] ?? defaultExpanded) : local;

  const setExpanded = useCallback(
    (next: boolean) => {
      if (storageKey) write({ ...getSnapshot(), [storageKey]: next });
      else setLocal(next);
    },
    [storageKey],
  );
  const toggle = useCallback(() => setExpanded(!expanded), [setExpanded, expanded]);

  return { expanded, setExpanded, toggle };
}
