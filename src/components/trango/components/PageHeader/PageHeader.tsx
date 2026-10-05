"use client";

import { createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { GoArrowLeft } from "react-icons/go";
import { pageHeaderSlotRecipe, type PageHeaderVariantProps } from "./PageHeader.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: pageHeaderSlotRecipe });

export interface PageHeaderRootProps extends HTMLChakraProps<"div">, PageHeaderVariantProps {}

/** Resolves the recipe (`size`, `hasBorder`) and shares its styles with every part. */
export const PageHeaderRoot = withProvider<HTMLDivElement, PageHeaderRootProps>("div", "root");

// Context area: shown below `md` by default. Override with `hideFrom` / `hideBelow` / `display`.
export type PageHeaderContextAreaProps = HTMLChakraProps<"div">;
export const PageHeaderContextArea = withContext<HTMLDivElement, PageHeaderContextAreaProps>(
  "div",
  "contextArea",
);

export type PageHeaderContextBarProps = HTMLChakraProps<"div">;
export const PageHeaderContextBar = withContext<HTMLDivElement, PageHeaderContextBarProps>(
  "div",
  "contextBar",
);

export type PageHeaderContextAreaActionsProps = HTMLChakraProps<"div">;
export const PageHeaderContextAreaActions = withContext<
  HTMLDivElement,
  PageHeaderContextAreaActionsProps
>("div", "contextAreaActions");

export type PageHeaderParentLinkProps = HTMLChakraProps<"a">;
const ParentLinkAnchor = withContext<HTMLAnchorElement, PageHeaderParentLinkProps>(
  "a",
  "parentLink",
);

/** Link up one level, with a back arrow. Pass a router link through `as`. */
export const PageHeaderParentLink = forwardRef<HTMLAnchorElement, PageHeaderParentLinkProps>(
  function PageHeaderParentLink({ children, ...props }, ref) {
    return (
      <ParentLinkAnchor ref={ref} {...props}>
        <GoArrowLeft aria-hidden="true" />
        <span>{children}</span>
      </ParentLinkAnchor>
    );
  },
);

// Title row
export type PageHeaderTitleAreaProps = HTMLChakraProps<"div">;
export const PageHeaderTitleArea = withContext<HTMLDivElement, PageHeaderTitleAreaProps>(
  "div",
  "titleArea",
);

export type PageHeaderLeadingActionProps = HTMLChakraProps<"div">;
export const PageHeaderLeadingAction = withContext<HTMLDivElement, PageHeaderLeadingActionProps>(
  "div",
  "leadingAction",
);

export type PageHeaderBreadcrumbsProps = HTMLChakraProps<"div">;
export const PageHeaderBreadcrumbs = withContext<HTMLDivElement, PageHeaderBreadcrumbsProps>(
  "div",
  "breadcrumbs",
);

export type PageHeaderLeadingVisualProps = HTMLChakraProps<"div">;
export const PageHeaderLeadingVisual = withContext<HTMLDivElement, PageHeaderLeadingVisualProps>(
  "div",
  "leadingVisual",
);

/** Renders an `h2`; change the level with `as`. */
export type PageHeaderTitleProps = HTMLChakraProps<"h2">;
export const PageHeaderTitle = withContext<HTMLHeadingElement, PageHeaderTitleProps>(
  "h2",
  "title",
);

export type PageHeaderTrailingVisualProps = HTMLChakraProps<"div">;
export const PageHeaderTrailingVisual = withContext<
  HTMLDivElement,
  PageHeaderTrailingVisualProps
>("div", "trailingVisual");

export type PageHeaderTrailingActionProps = HTMLChakraProps<"div">;
export const PageHeaderTrailingAction = withContext<
  HTMLDivElement,
  PageHeaderTrailingActionProps
>("div", "trailingAction");

export type PageHeaderActionsProps = HTMLChakraProps<"div">;
export const PageHeaderActions = withContext<HTMLDivElement, PageHeaderActionsProps>(
  "div",
  "actions",
);

// Rows under the title
export type PageHeaderDescriptionProps = HTMLChakraProps<"div">;
export const PageHeaderDescription = withContext<HTMLDivElement, PageHeaderDescriptionProps>(
  "div",
  "description",
);

/** Local navigation. Use `as="nav"` with an `aria-label` when it holds links. */
export type PageHeaderNavigationProps = HTMLChakraProps<"div">;
export const PageHeaderNavigation = withContext<HTMLDivElement, PageHeaderNavigationProps>(
  "div",
  "navigation",
);
