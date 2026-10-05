"use client";

import { Breadcrumb, createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { Fragment } from "react";
import { GoSearch } from "react-icons/go";
import { TopNavRoot, type TopNavRootProps } from "../TopNav";
import { globalNavSlotRecipe } from "./GlobalNav.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: globalNavSlotRecipe });

export type GlobalNavRootProps = TopNavRootProps;

/** A `TopNav` root. Lay it out with TopNav's `Bar`, `Left`, `Center`, `Right` and `Local`. */
export const GlobalNavRoot = withProvider<HTMLElement, GlobalNavRootProps>(TopNavRoot, "root", {
  defaultProps: { "aria-label": "Global navigation" },
});

/** Home link. Children are the logo icon; name it with `aria-label`. */
export type GlobalNavLogoProps = HTMLChakraProps<"a">;
export const GlobalNavLogo = withContext<HTMLAnchorElement, GlobalNavLogoProps>("a", "logo");

/** Icon link in the bar. Name it with `aria-label`; `aria-current="page"` marks it active. */
export type GlobalNavLinkProps = HTMLChakraProps<"a">;
export const GlobalNavLink = withContext<HTMLAnchorElement, GlobalNavLinkProps>("a", "link");

export type GlobalNavSearchProps = HTMLChakraProps<"button">;
const SearchButton = withContext<HTMLButtonElement, GlobalNavSearchProps>("button", "search", {
  defaultProps: { type: "button" },
});
const SearchLabel = withContext<HTMLSpanElement, HTMLChakraProps<"span">>("span", "searchLabel");

/** Search box look-alike that opens the real search; children are its placeholder text. */
export function GlobalNavSearch({ children = "Search or jump to...", ...props }: GlobalNavSearchProps) {
  return (
    <SearchButton {...props}>
      <GoSearch aria-hidden="true" />
      <SearchLabel>{children}</SearchLabel>
    </SearchButton>
  );
}

export interface GlobalNavCrumb {
  label: string;
  /** Leave out for the current page, which renders as plain text. */
  href?: string;
}

export interface GlobalNavBreadcrumbsProps extends Breadcrumb.RootProps {
  items: GlobalNavCrumb[];
}

/** Trail of where the user is; the last item is the current page. */
export function GlobalNavBreadcrumbs({ items, ...props }: GlobalNavBreadcrumbsProps) {
  return (
    <Breadcrumb.Root size="sm" {...props}>
      <Breadcrumb.List>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={item.href ?? item.label}>
              <Breadcrumb.Item>
                {last || !item.href ? (
                  <Breadcrumb.CurrentLink fontWeight="semibold">{item.label}</Breadcrumb.CurrentLink>
                ) : (
                  <Breadcrumb.Link asChild>
                    <NextLink href={item.href}>{item.label}</NextLink>
                  </Breadcrumb.Link>
                )}
              </Breadcrumb.Item>
              {last ? null : <Breadcrumb.Separator />}
            </Fragment>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
