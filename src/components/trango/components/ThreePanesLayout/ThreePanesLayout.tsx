"use client";

import { CollapsibleSidebarRoot, type CollapsibleSidebarRootProps } from "../CollapsibleSidebar";
import {
  PageLayoutContent,
  PageLayoutPane,
  PageLayoutRoot,
  PageLayoutSidebar,
  type PageLayoutContentProps,
  type PageLayoutPaneProps,
  type PageLayoutRootProps,
  type PageLayoutSidebarProps,
} from "../PageLayout";

// ThreePanesLayout has no styles of its own: it is PageLayout's sidebar, pane and content
// columns, with the defaults of a full-width, edge-to-edge workspace.

export type ThreePanesLayoutRootProps = PageLayoutRootProps;

/** PageLayout set up for three columns. Every default is a PageLayout variant and can be set. */
export function ThreePanesLayoutRoot(props: ThreePanesLayoutRootProps) {
  return (
    <PageLayoutRoot
      containerWidth="full"
      padding="none"
      rowGap="none"
      columnGap="none"
      regionPadding="condensed"
      panePosition="start"
      paneWidth="large"
      paneDivider="line"
      sidebarDivider="line"
      sticky
      {...props}
    />
  );
}

export type ThreePanesLayoutLeftPaneProps = PageLayoutSidebarProps;

/** First column, from `md` up. Give it an `aria-label`. */
export function ThreePanesLayoutLeftPane(props: ThreePanesLayoutLeftPaneProps) {
  return <PageLayoutSidebar hideBelow="md" {...props} />;
}

export type ThreePanesLayoutCollapsibleLeftPaneProps = CollapsibleSidebarRootProps;

/** First column as a `CollapsibleSidebar`, in place of `LeftPane`. */
export function ThreePanesLayoutCollapsibleLeftPane(props: ThreePanesLayoutCollapsibleLeftPaneProps) {
  return <CollapsibleSidebarRoot gridArea="sidebar-start" hideBelow="md" {...props} />;
}

export type ThreePanesLayoutMiddlePaneProps = PageLayoutPaneProps;

/** Second column: resizable, and shown from `xl` up, where there is room for three. */
export function ThreePanesLayoutMiddlePane(props: ThreePanesLayoutMiddlePaneProps) {
  return <PageLayoutPane resizable hideBelow="xl" {...props} />;
}

/** Third column, always shown. */
export type ThreePanesLayoutContentProps = PageLayoutContentProps;
export const ThreePanesLayoutContent = PageLayoutContent;
