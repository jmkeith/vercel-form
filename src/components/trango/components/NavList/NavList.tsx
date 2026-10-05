"use client";

import { Collapsible, createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react";
import { useCallback, useState, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { GoChevronDown, GoPlus } from "react-icons/go";
import {
  ActionListDescription,
  ActionListDivider,
  ActionListGroup,
  ActionListGroupHeading,
  ActionListHeading,
  ActionListItem,
  ActionListItemLink,
  ActionListItemRoot,
  ActionListLeadingVisual,
  ActionListLinkItem,
  ActionListRoot,
  ActionListTrailingAction,
  ActionListTrailingVisual,
  type ActionListGroupProps,
  type ActionListHeadingProps,
  type ActionListItemProps,
  type ActionListLinkItemProps,
} from "../ActionList";
import { navListSlotRecipe, type NavListVariantProps } from "./NavList.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: navListSlotRecipe });

const CURRENT = "[aria-current]:not([aria-current=false])";

// Root
export interface NavListRootProps extends HTMLChakraProps<"nav">, NavListVariantProps {}
const NavRoot = withProvider<HTMLElement, NavListRootProps>("nav", "root");

/** A `nav` landmark (name it with `aria-label`) holding the list of links. */
export function NavListRoot({ children, ...props }: NavListRootProps) {
  return (
    <NavRoot {...props}>
      <ActionListRoot>{children}</ActionListRoot>
    </NavRoot>
  );
}

/** Title of the navigation, an `h2` by default. */
export function NavListHeading(props: ActionListHeadingProps) {
  return <ActionListHeading size="small" {...props} />;
}

// Items
const Branch = withContext<HTMLLIElement, HTMLChakraProps<"li">>("li", "branch");
const Chevron = withContext<HTMLSpanElement, HTMLChakraProps<"span">>("span", "chevron");

export interface NavListItemProps extends ActionListLinkItemProps {
  /** A `NavList.SubNav`. Turns the row into a button that shows and hides it. */
  subNav?: ReactNode;
  /** Whether the sub nav starts open. It always does when it holds the current page. */
  defaultOpen?: boolean;
}

// A parent row. It stands in for the current page while that page is hidden in its sub nav.
function NavListBranch(props: NavListItemProps) {
  const { subNav, defaultOpen = false, active, trailingAction, children, ...rest } = props;
  const [open, setOpen] = useState(defaultOpen);
  const [holdsCurrent, setHoldsCurrent] = useState(false);

  // Runs on mount, when the sub nav is in the document even if it is closed.
  const openOnCurrent = useCallback((branch: HTMLLIElement | null) => {
    if (!branch?.querySelector(CURRENT)) return;
    setHoldsCurrent(true);
    setOpen(true);
  }, []);
  const onClick = (event: MouseEvent<HTMLElement>) =>
    setHoldsCurrent(Boolean(event.currentTarget.closest("li")?.querySelector(CURRENT)));
  const showCurrent = active || (holdsCurrent && !open);

  return (
    <Collapsible.Root asChild unstyled open={open} onOpenChange={(event) => setOpen(event.open)}>
      <Branch ref={openOnCurrent}>
        <ActionListItemRoot as="div" data-current={showCurrent ? "" : undefined}>
          <Collapsible.Trigger asChild onClick={onClick}>
            <ActionListItemLink as="button" {...rest}>
              {children}
              <Collapsible.Indicator asChild>
                <Chevron>
                  <GoChevronDown />
                </Chevron>
              </Collapsible.Indicator>
            </ActionListItemLink>
          </Collapsible.Trigger>
          {trailingAction}
        </ActionListItemRoot>
        {subNav}
      </Branch>
    </Collapsible.Root>
  );
}

/**
 * A link in the navigation; `aria-current` marks the page the user is on. Given a `subNav` it is
 * instead the parent row that expands it.
 */
export function NavListItem({ subNav, defaultOpen, ...props }: NavListItemProps) {
  if (subNav == null) return <ActionListLinkItem {...props} />;
  // A parent row is a button: what only a link takes stays off it.
  const row = { ...props };
  delete row.href;
  delete row.inactiveText;
  return <NavListBranch subNav={subNav} defaultOpen={defaultOpen} {...row} />;
}

export type NavListSubNavProps = HTMLChakraProps<"ul">;
const SubNavList = withContext<HTMLUListElement, NavListSubNavProps>("ul", "subNav");

/** The links under a parent item, given to its `subNav`. Nests up to four levels. */
export function NavListSubNav(props: NavListSubNavProps) {
  return (
    <Collapsible.Content asChild>
      <SubNavList {...props} />
    </Collapsible.Content>
  );
}

// Groups
export interface NavListGroupProps extends ActionListGroupProps {
  /** Drops the divider drawn above the group. */
  hideDivider?: boolean;
}

/** A titled set of links, separated from what comes before it. */
export function NavListGroup({ hideDivider, ...props }: NavListGroupProps) {
  return (
    <>
      {hideDivider ? null : <ActionListDivider />}
      <ActionListGroup {...props} />
    </>
  );
}

export interface NavListGroupExpandProps extends Omit<ActionListItemProps, "children"> {
  /** Text of the row. */
  label?: ReactNode;
  /** The further items, e.g. an array of `NavList.Item`. */
  items: ReactNode[];
  /** Reveal the items over this many clicks instead of all at once. */
  pages?: number;
}

/** A "Show more" row that reveals further items and moves focus to the first new one. */
export function NavListGroupExpand(props: NavListGroupExpandProps) {
  const { label = "Show more", items, pages = 1, ...rest } = props;
  const [page, setPage] = useState(0);

  const onSelect = (event: MouseEvent<HTMLButtonElement>) => {
    const row = event.currentTarget.closest("li");
    const list = row?.parentElement;
    const lastShown = row?.previousElementSibling;
    flushSync(() => setPage(page + 1));
    const firstNew = lastShown ? lastShown.nextElementSibling : list?.firstElementChild;
    firstNew?.querySelector<HTMLElement>("a, button")?.focus();
  };

  return (
    <>
      {items.slice(0, Math.ceil((items.length / pages) * page))}
      {page < pages ? (
        <ActionListItem aria-expanded={false} onSelect={onSelect} {...rest}>
          {label}
          <ActionListTrailingVisual>
            <GoPlus />
          </ActionListTrailingVisual>
        </ActionListItem>
      ) : null}
    </>
  );
}

// Parts NavList shares with ActionList
export const NavListLeadingVisual = ActionListLeadingVisual;
export const NavListTrailingVisual = ActionListTrailingVisual;
export const NavListDescription = ActionListDescription;
export const NavListTrailingAction = ActionListTrailingAction;
export const NavListDivider = ActionListDivider;
export const NavListGroupHeading = ActionListGroupHeading;
