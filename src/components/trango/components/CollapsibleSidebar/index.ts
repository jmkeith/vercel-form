import {
  CollapsibleSidebarBody,
  CollapsibleSidebarFooter,
  CollapsibleSidebarRoot,
  CollapsibleSidebarScope,
  CollapsibleSidebarToggle,
} from "./CollapsibleSidebar";

export const CollapsibleSidebar = {
  Root: CollapsibleSidebarRoot,
  Body: CollapsibleSidebarBody,
  Footer: CollapsibleSidebarFooter,
  Toggle: CollapsibleSidebarToggle,
  Scope: CollapsibleSidebarScope,
};

export * from "./CollapsibleSidebar";
export * from "./CollapsibleSidebar.recipe";
export * from "./useCollapsibleSidebarState";
