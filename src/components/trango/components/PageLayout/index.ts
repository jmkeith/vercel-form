import {
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutPane,
  PageLayoutRoot,
  PageLayoutSidebar,
} from "./PageLayout";

export const PageLayout = {
  Root: PageLayoutRoot,
  Header: PageLayoutHeader,
  Content: PageLayoutContent,
  Pane: PageLayoutPane,
  Sidebar: PageLayoutSidebar,
  Footer: PageLayoutFooter,
};

export * from "./PageLayout";
export * from "./PageLayout.recipe";
export { usePaneResize as usePageLayoutPaneResize } from "./usePaneResize";
export type { UsePaneResizeOptions as PageLayoutPaneResizeOptions } from "./usePaneResize";
