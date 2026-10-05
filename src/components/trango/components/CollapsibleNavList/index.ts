import {
  NavListDescription,
  NavListDivider,
  NavListGroupExpand,
  NavListGroupHeading,
  NavListHeading,
  NavListLeadingVisual,
  NavListRoot,
  NavListSubNav,
  NavListTrailingAction,
  NavListTrailingVisual,
} from "../NavList";
import { CollapsibleNavListGroup, CollapsibleNavListItem } from "./CollapsibleNavList";

export const CollapsibleNavList = {
  Root: NavListRoot,
  Heading: NavListHeading,
  Item: CollapsibleNavListItem,
  Group: CollapsibleNavListGroup,
  GroupHeading: NavListGroupHeading,
  GroupExpand: NavListGroupExpand,
  SubNav: NavListSubNav,
  LeadingVisual: NavListLeadingVisual,
  TrailingVisual: NavListTrailingVisual,
  TrailingAction: NavListTrailingAction,
  Description: NavListDescription,
  Divider: NavListDivider,
};

export * from "./CollapsibleNavList";
