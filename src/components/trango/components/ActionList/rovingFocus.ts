import type { FocusEvent, KeyboardEvent } from "react";

const ITEMS = "[role^=menuitem], [role=option]";
const CHOSEN = "[aria-checked=true], [aria-selected=true]";

const itemsOf = (list: HTMLElement) => Array.from(list.querySelectorAll<HTMLElement>(ITEMS));

/**
 * Props that make a `role="menu"` / `role="listbox"` list a single tab stop. The list takes the
 * Tab key and hands focus to its chosen (or first) item; the arrow keys, Home and End move focus
 * between the items, which are themselves out of the tab order.
 */
export const rovingFocusProps = {
  tabIndex: 0,
  onFocus(event: FocusEvent<HTMLElement>) {
    const list = event.currentTarget;
    // While focus is inside, the list steps out of the tab order so Shift+Tab can leave it.
    list.tabIndex = -1;
    if (event.target !== list) return;
    (list.querySelector<HTMLElement>(CHOSEN) ?? itemsOf(list)[0])?.focus();
  },
  onBlur(event: FocusEvent<HTMLElement>) {
    const list = event.currentTarget;
    if (!list.contains(event.relatedTarget)) list.tabIndex = 0;
  },
  onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const items = itemsOf(event.currentTarget);
    const index = items.indexOf(document.activeElement as HTMLElement);
    const last = items.length - 1;
    const moves: Record<string, number | undefined> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowUp: index <= 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const next = moves[event.key];
    if (next === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    items[next]?.focus();
  },
};
