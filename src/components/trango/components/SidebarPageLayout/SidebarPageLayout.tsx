"use client";

import {
  CloseButton,
  createSlotRecipeContext,
  Drawer,
  IconButton,
  Portal,
  type IconButtonProps,
} from "@chakra-ui/react";
import { useState, type ReactNode } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import {
  CollapsibleSidebarBody,
  CollapsibleSidebarFooter,
  CollapsibleSidebarRoot,
  CollapsibleSidebarToggle,
  useCollapsibleSidebarState,
  type CollapsibleSidebarRootProps,
  type CollapsibleSidebarState,
  type UseCollapsibleSidebarStateOptions,
} from "../CollapsibleSidebar";
import { PageHeaderLeadingAction, PageHeaderRoot, type PageHeaderRootProps } from "../PageHeader";
import {
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutRoot,
  type PageLayoutContentProps,
  type PageLayoutFooterProps,
  type PageLayoutHeaderProps,
  type PageLayoutRootProps,
} from "../PageLayout";
import { sidebarPageLayoutSlotRecipe } from "./SidebarPageLayout.recipe";

const { withProvider, withContext, PropsProvider, usePropsContext } = createSlotRecipeContext({
  recipe: sidebarPageLayoutSlotRecipe,
});

/** State of the layout's sidebar: the rail from `md`, the drawer below it. */
export interface SidebarPageLayoutState extends CollapsibleSidebarState {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

/** Reads and controls the sidebar from anywhere inside a `SidebarPageLayout.Root`. */
export function useSidebarPageLayout(): SidebarPageLayoutState {
  return usePropsContext() as SidebarPageLayoutState;
}

// PageLayout with the defaults of a full-page shell; every one is a variant and can be set.
const LayoutRoot = withProvider<HTMLDivElement, PageLayoutRootProps>(PageLayoutRoot, "root", {
  defaultProps: {
    containerWidth: "full",
    contentWidth: "xlarge",
    padding: "none",
    rowGap: "none",
    columnGap: "none",
    regionPadding: "normal",
    footerDivider: "line",
  },
});

export interface SidebarPageLayoutRootProps
  extends PageLayoutRootProps,
    UseCollapsibleSidebarStateOptions {}

/**
 * A page with a collapsible sidebar. Holds the sidebar's state: `storageKey` remembers whether
 * it is expanded, e.g. across the pages of one section.
 */
export function SidebarPageLayoutRoot(props: SidebarPageLayoutRootProps) {
  const { storageKey, defaultExpanded, children, ...rest } = props;
  const sidebar = useCollapsibleSidebarState({ storageKey, defaultExpanded });
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <LayoutRoot {...rest}>
      <PropsProvider value={{ ...sidebar, drawerOpen, setDrawerOpen }}>{children}</PropsProvider>
    </LayoutRoot>
  );
}

// The regions are PageLayout's own.
export type SidebarPageLayoutHeaderProps = PageLayoutHeaderProps;
export const SidebarPageLayoutHeader = PageLayoutHeader;

export type SidebarPageLayoutContentProps = PageLayoutContentProps;
export const SidebarPageLayoutContent = PageLayoutContent;

export type SidebarPageLayoutFooterProps = PageLayoutFooterProps;
export const SidebarPageLayoutFooter = PageLayoutFooter;

const SidebarRail = withContext<HTMLElement, CollapsibleSidebarRootProps>(
  CollapsibleSidebarRoot,
  "sidebar",
);

export interface SidebarPageLayoutSidebarProps
  extends Omit<CollapsibleSidebarRootProps, "expanded" | "onExpandedChange"> {
  /** Title of the drawer that holds the sidebar below `md`. Defaults to the `aria-label`. */
  drawerTitle?: string;
  /** Replaces the collapse toggle at the bottom of the rail; `null` removes it. */
  footer?: ReactNode;
}

/** The sidebar: a collapsible rail from `md`, and the same content in a drawer below it. */
export function SidebarPageLayoutSidebar(props: SidebarPageLayoutSidebarProps) {
  const { drawerTitle, footer, children, ...rest } = props;
  const { expanded, setExpanded, drawerOpen, setDrawerOpen } = useSidebarPageLayout();

  return (
    <>
      <SidebarRail expanded={expanded} onExpandedChange={setExpanded} {...rest}>
        <CollapsibleSidebarBody>{children}</CollapsibleSidebarBody>
        {footer === null ? null : (
          <CollapsibleSidebarFooter>{footer ?? <CollapsibleSidebarToggle />}</CollapsibleSidebarFooter>
        )}
      </SidebarRail>
      <Drawer.Root
        open={drawerOpen}
        onOpenChange={(event) => setDrawerOpen(event.open)}
        placement="start"
        size="xs"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>{drawerTitle ?? rest["aria-label"] ?? "Sidebar"}</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body paddingInline="0">{children}</Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}

const TriggerButton = withContext<HTMLButtonElement, IconButtonProps>(IconButton, "trigger", {
  defaultProps: { variant: "ghost", size: "sm", "aria-label": "Open sidebar" },
});

export type SidebarPageLayoutTriggerProps = IconButtonProps;

/** Opens the sidebar drawer. Hidden from `md`, where the rail is on screen. */
export function SidebarPageLayoutTrigger(props: SidebarPageLayoutTriggerProps) {
  const { drawerOpen, setDrawerOpen } = useSidebarPageLayout();
  return (
    <TriggerButton
      aria-haspopup="dialog"
      aria-expanded={drawerOpen}
      onClick={() => setDrawerOpen(true)}
      {...props}
    >
      <GoSidebarCollapse />
    </TriggerButton>
  );
}

/** A `PageHeader.Root` that leads with the sidebar trigger below `md`. */
export function SidebarPageLayoutPageHeader({ children, ...props }: PageHeaderRootProps) {
  return (
    <PageHeaderRoot {...props}>
      <PageHeaderLeadingAction display={{ base: "flex", md: "none" }}>
        <SidebarPageLayoutTrigger />
      </PageHeaderLeadingAction>
      {children}
    </PageHeaderRoot>
  );
}
