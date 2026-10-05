"use client";

import { Popover, Portal } from "@chakra-ui/react";
import { useState, type MouseEvent, type ReactNode } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionListItemButton, ActionListItemRoot } from "../ActionList";
import { CollapsibleSidebarScope, useCollapsibleSidebar } from "../CollapsibleSidebar";
import {
  NavListDivider,
  NavListGroup,
  NavListItem,
  NavListLeadingVisual,
  NavListRoot,
  NavListTrailingVisual,
  type NavListGroupProps,
  type NavListItemProps,
} from "../NavList";

// CollapsibleNavList has no styles of its own: it is NavList's parts, adapted to the
// `CollapsibleSidebar` they are in.

export interface CollapsibleNavListItemProps extends Omit<NavListItemProps, "children"> {
  /** All that shows of the link in the rail. */
  icon: ReactNode;
  /** The link's text, and its tooltip in the rail. */
  label: string;
  /** Counter, badge or icon at the end of the row while expanded. */
  trailingVisual?: ReactNode;
}

/** A navigation link made of an icon and a label. Pass a router link through `as`. */
export function CollapsibleNavListItem(props: CollapsibleNavListItemProps) {
  const { icon, label, trailingVisual, ...rest } = props;
  const { expanded } = useCollapsibleSidebar();

  return (
    <Tooltip content={label} disabled={expanded} positioning={{ placement: "right" }}>
      <NavListItem {...rest}>
        <NavListLeadingVisual>{icon}</NavListLeadingVisual>
        {label}
        {trailingVisual == null ? null : (
          <NavListTrailingVisual>{trailingVisual}</NavListTrailingVisual>
        )}
      </NavListItem>
    </Tooltip>
  );
}

export interface CollapsibleNavListGroupProps extends Omit<NavListGroupProps, "title"> {
  title: string;
  /**
   * Gives the group one row in the rail that opens its links in a popover. Without it the
   * links stay in the rail, each showing its own icon.
   */
  icon?: ReactNode;
  /** Highlights the group's rail row, for when it holds the current page. */
  active?: boolean;
}

/** A titled set of links. In the rail the title is hidden, or the group becomes a popover. */
export function CollapsibleNavListGroup(props: CollapsibleNavListGroupProps) {
  const { title, icon, active, hideDivider, children, ...rest } = props;
  const { expanded } = useCollapsibleSidebar();
  const [open, setOpen] = useState(false);

  if (expanded || icon == null) {
    return (
      <NavListGroup title={title} hideDivider={hideDivider} {...rest}>
        {children}
      </NavListGroup>
    );
  }

  // Following a link closes the popover; opening it in a new tab does not.
  const closeOnNavigate = (event: MouseEvent<HTMLElement>) => {
    const link = (event.target as HTMLElement).closest("a");
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey) setOpen(false);
  };

  return (
    <>
      {hideDivider ? null : <NavListDivider />}
      <Popover.Root
        open={open}
        onOpenChange={(event) => setOpen(event.open)}
        positioning={{ placement: "right-start", gutter: 8 }}
        lazyMount
        unmountOnExit
      >
        <ActionListItemRoot data-current={active ? "" : undefined}>
          <Tooltip content={title} disabled={open} positioning={{ placement: "right" }}>
            <Popover.Trigger asChild>
              <ActionListItemButton>
                <NavListLeadingVisual>{icon}</NavListLeadingVisual>
                {title}
              </ActionListItemButton>
            </Popover.Trigger>
          </Tooltip>
        </ActionListItemRoot>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width="256px" maxHeight="432px" overflowY="auto" onClick={closeOnNavigate}>
              <CollapsibleSidebarScope>
                <NavListRoot aria-label={title}>
                  <NavListGroup title={title} hideDivider {...rest}>
                    {children}
                  </NavListGroup>
                </NavListRoot>
              </CollapsibleSidebarScope>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </>
  );
}
