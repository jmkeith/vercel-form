"use client";

import {
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutPane,
  PageLayoutRoot,
  PageLayoutSidebar,
  type PageLayoutContentProps,
  type PageLayoutFooterProps,
  type PageLayoutHeaderProps,
  type PageLayoutPaneProps,
  type PageLayoutSidebarProps,
} from "../PageLayout";

export type SplitPageLayoutRootProps = React.ComponentProps<typeof PageLayoutRoot>;

/**
 * PageLayout with the split defaults: full width, no outer padding or gaps, padded regions
 * separated by lines, and a sticky pane at the start. Every default is a PageLayout variant
 * and can be overridden here.
 */
export function SplitPageLayoutRoot(props: SplitPageLayoutRootProps) {
  return (
    <PageLayoutRoot
      containerWidth="full"
      contentWidth="large"
      padding="none"
      rowGap="none"
      columnGap="none"
      regionPadding="normal"
      panePosition="start"
      sticky
      headerDivider="line"
      paneDivider="line"
      sidebarDivider="line"
      footerDivider="line"
      {...props}
    />
  );
}

// The parts are PageLayout's own: the root's variants are all that differs.
export type SplitPageLayoutHeaderProps = PageLayoutHeaderProps;
export const SplitPageLayoutHeader = PageLayoutHeader;

export type SplitPageLayoutContentProps = PageLayoutContentProps;
export const SplitPageLayoutContent = PageLayoutContent;

export type SplitPageLayoutPaneProps = PageLayoutPaneProps;
export const SplitPageLayoutPane = PageLayoutPane;

export type SplitPageLayoutSidebarProps = PageLayoutSidebarProps;
export const SplitPageLayoutSidebar = PageLayoutSidebar;

export type SplitPageLayoutFooterProps = PageLayoutFooterProps;
export const SplitPageLayoutFooter = PageLayoutFooter;
