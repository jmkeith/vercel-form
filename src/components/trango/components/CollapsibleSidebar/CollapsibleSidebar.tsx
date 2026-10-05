"use client";

import { createSlotRecipeContext, mergeRefs, type HTMLChakraProps } from "@chakra-ui/react";
import { useId, type ReactNode, type Ref } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Tooltip } from "@/components/ui/tooltip";
import {
  ActionListItem,
  ActionListLeadingVisual,
  ActionListRoot,
  type ActionListItemProps,
} from "../ActionList";
import { usePageLayoutPaneResize } from "../PageLayout";
import {
  collapsibleSidebarSlotRecipe,
  type CollapsibleSidebarVariantProps,
} from "./CollapsibleSidebar.recipe";

const { withProvider, withContext, PropsProvider, usePropsContext } = createSlotRecipeContext({
  recipe: collapsibleSidebarSlotRecipe,
});

// What the parts inside a sidebar read from it, through the recipe's props context.
interface SidebarScope {
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  id?: string;
}

/**
 * The sidebar a component is in: whether it is expanded, a `toggle`, and its id. Outside a
 * sidebar it reports expanded, so rows render in full anywhere.
 */
export function useCollapsibleSidebar() {
  const { expanded = true, onExpandedChange, id }: SidebarScope = usePropsContext();
  return { expanded, id, toggle: () => onExpandedChange?.(!expanded) };
}

/** Makes its children render as if in an expanded sidebar, e.g. inside a popover of a rail. */
export function CollapsibleSidebarScope({ children }: { children: ReactNode }) {
  return <PropsProvider value={{ expanded: true }}>{children}</PropsProvider>;
}

type AsideProps = HTMLChakraProps<"aside"> & CollapsibleSidebarVariantProps;
const SidebarAside = withProvider<HTMLElement, AsideProps>("aside", "root");

const ResizeHandle = withContext<HTMLDivElement, HTMLChakraProps<"div">>("div", "resizeHandle", {
  defaultProps: {
    role: "separator",
    tabIndex: 0,
    "aria-orientation": "vertical",
    "aria-label": "Resize sidebar",
  },
});

export interface CollapsibleSidebarRootProps
  extends HTMLChakraProps<"aside">,
    Omit<CollapsibleSidebarVariantProps, "expanded"> {
  ref?: Ref<HTMLElement>;
  /** `false` shows the icon-only rail. Hold it with `useCollapsibleSidebarState`. */
  expanded?: boolean;
  /** Called by `CollapsibleSidebar.Toggle` with the state it asks for. */
  onExpandedChange?: (expanded: boolean) => void;
  /** Adds a handle on the sidebar's edge to resize it while expanded. */
  resizable?: boolean;
  /** localStorage key to remember the resized width under. */
  widthStorageKey?: string;
}

/**
 * Resolves the recipe (`expanded`, `size`) and shares it, and the expanded state, with what is
 * inside. Give it an `aria-label`.
 */
export function CollapsibleSidebarRoot(props: CollapsibleSidebarRootProps) {
  const {
    expanded = true,
    onExpandedChange,
    resizable = false,
    widthStorageKey,
    ref,
    children,
    ...rest
  } = props;
  const id = useId();
  const resizing = resizable && expanded;
  const { paneRef, handleProps } = usePageLayoutPaneResize({
    enabled: resizing,
    storageKey: widthStorageKey,
    widthVar: "--collapsible-sidebar-width",
  });

  return (
    <SidebarAside
      id={id}
      ref={mergeRefs(paneRef, ref)}
      expanded={expanded}
      data-resizable={resizable ? "" : undefined}
      {...rest}
    >
      <PropsProvider value={{ expanded, onExpandedChange, id }}>
        {children}
        {resizing ? <ResizeHandle {...handleProps} /> : null}
      </PropsProvider>
    </SidebarAside>
  );
}

/** The scrolling area, for the navigation. */
export type CollapsibleSidebarBodyProps = HTMLChakraProps<"div">;
export const CollapsibleSidebarBody = withContext<HTMLDivElement, CollapsibleSidebarBodyProps>(
  "div",
  "body",
);

/** Stays at the bottom while the body scrolls. Usually holds the `Toggle`. */
export type CollapsibleSidebarFooterProps = HTMLChakraProps<"div">;
export const CollapsibleSidebarFooter = withContext<HTMLDivElement, CollapsibleSidebarFooterProps>(
  "div",
  "footer",
);

export interface CollapsibleSidebarToggleProps extends Omit<ActionListItemProps, "children"> {
  collapseLabel?: string;
  expandLabel?: string;
}

/** A row that collapses or expands the sidebar it is in, styled like the rows above it. */
export function CollapsibleSidebarToggle(props: CollapsibleSidebarToggleProps) {
  const { collapseLabel = "Collapse sidebar", expandLabel = "Expand sidebar", ...rest } = props;
  const { expanded, id, toggle } = useCollapsibleSidebar();
  const label = expanded ? collapseLabel : expandLabel;

  return (
    <ActionListRoot>
      <Tooltip content={label} disabled={expanded} positioning={{ placement: "right" }}>
        <ActionListItem aria-expanded={expanded} aria-controls={id} onSelect={toggle} {...rest}>
          <ActionListLeadingVisual>
            {expanded ? <GoSidebarExpand /> : <GoSidebarCollapse />}
          </ActionListLeadingVisual>
          {label}
        </ActionListItem>
      </Tooltip>
    </ActionListRoot>
  );
}
