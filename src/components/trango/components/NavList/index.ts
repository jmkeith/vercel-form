import {
  NavListDescription,
  NavListDivider,
  NavListGroup,
  NavListGroupExpand,
  NavListGroupHeading,
  NavListHeading,
  NavListItem,
  NavListLeadingVisual,
  NavListRoot,
  NavListSubNav,
  NavListTrailingAction,
  NavListTrailingVisual,
} from "./NavList";

export const NavList = {
  Root: NavListRoot,
  Heading: NavListHeading,
  Item: NavListItem,
  SubNav: NavListSubNav,
  LeadingVisual: NavListLeadingVisual,
  TrailingVisual: NavListTrailingVisual,
  Description: NavListDescription,
  TrailingAction: NavListTrailingAction,
  Divider: NavListDivider,
  Group: NavListGroup,
  GroupHeading: NavListGroupHeading,
  GroupExpand: NavListGroupExpand,
};

export * from "./NavList";
export * from "./NavList.recipe";
