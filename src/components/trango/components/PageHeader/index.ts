import {
  PageHeaderActions,
  PageHeaderBreadcrumbs,
  PageHeaderContextArea,
  PageHeaderContextAreaActions,
  PageHeaderContextBar,
  PageHeaderDescription,
  PageHeaderLeadingAction,
  PageHeaderLeadingVisual,
  PageHeaderNavigation,
  PageHeaderParentLink,
  PageHeaderRoot,
  PageHeaderTitle,
  PageHeaderTitleArea,
  PageHeaderTrailingAction,
  PageHeaderTrailingVisual,
} from "./PageHeader";

export const PageHeader = {
  Root: PageHeaderRoot,
  ContextArea: PageHeaderContextArea,
  ParentLink: PageHeaderParentLink,
  ContextBar: PageHeaderContextBar,
  ContextAreaActions: PageHeaderContextAreaActions,
  TitleArea: PageHeaderTitleArea,
  LeadingAction: PageHeaderLeadingAction,
  Breadcrumbs: PageHeaderBreadcrumbs,
  LeadingVisual: PageHeaderLeadingVisual,
  Title: PageHeaderTitle,
  TrailingVisual: PageHeaderTrailingVisual,
  TrailingAction: PageHeaderTrailingAction,
  Actions: PageHeaderActions,
  Description: PageHeaderDescription,
  Navigation: PageHeaderNavigation,
};

export * from "./PageHeader";
export * from "./PageHeader.recipe";
