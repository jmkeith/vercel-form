import { TopNavAbove, TopNavBar, TopNavCenter, TopNavLeft, TopNavLocal, TopNavRight } from "../TopNav";
import {
  GlobalNavBreadcrumbs,
  GlobalNavLink,
  GlobalNavLogo,
  GlobalNavRoot,
  GlobalNavSearch,
} from "./GlobalNav";

export const GlobalNav = {
  Root: GlobalNavRoot,
  Above: TopNavAbove,
  Bar: TopNavBar,
  Left: TopNavLeft,
  Center: TopNavCenter,
  Right: TopNavRight,
  Local: TopNavLocal,
  Logo: GlobalNavLogo,
  Breadcrumbs: GlobalNavBreadcrumbs,
  Search: GlobalNavSearch,
  Link: GlobalNavLink,
};

export * from "./GlobalNav";
export * from "./GlobalNav.recipe";
