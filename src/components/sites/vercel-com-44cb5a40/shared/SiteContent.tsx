"use client";

import { createSlotRecipeContext, type RecipeVariantProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { siteContentRecipe } from "./theme/recipes/site-content.recipe";

const { withProvider, withContext } = createSlotRecipeContext({
  recipe: siteContentRecipe,
});

type SiteContentVariantProps = RecipeVariantProps<typeof siteContentRecipe>;

export const SiteContentRoot = withProvider<
  HTMLDivElement,
  React.ComponentProps<"div"> & SiteContentVariantProps
>("div", "root");
export const SiteContentGutter = withContext<
  HTMLDivElement,
  React.ComponentProps<"div">
>("div", "gutter");
export const SiteContentHeader = withContext<
  HTMLDivElement,
  React.ComponentProps<"div">
>("div", "header");
export const SiteContentHeading = withContext<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>("h2", "heading");
export const SiteContentBody = withContext<
  HTMLDivElement,
  React.ComponentProps<"div">
>("div", "body");

/** Side panel beside the body; only laid out with `headingPlacement="top"`. */
export const SiteContentAside = withContext<
  HTMLElement,
  React.ComponentProps<"aside">
>("aside", "aside");

/** Padded container for free-form content inside `SiteContent`. */
export const SiteContentBlock = withContext<
  HTMLDivElement,
  React.ComponentProps<"div">
>("div", "block");
/** Linked row with a hover background, as used by the course list. */
export const SiteContentItem = withContext<
  HTMLAnchorElement,
  React.ComponentProps<"a">
>("a", "item");
export const SiteContentItemTitle = withContext<
  HTMLHeadingElement,
  React.ComponentProps<"h3">
>("h3", "itemTitle");
export const SiteContentItemDescription = withContext<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>("p", "itemDescription");

interface SiteContentProps {
  heading: ReactNode;
  children: ReactNode;
  /**
   * "side" (default) puts the heading in a column left of the body.
   * "top" puts it in a full-width row above the body.
   */
  headingPlacement?: "side" | "top";
  /** Panel to the right of the body. Requires `headingPlacement="top"`. */
  aside?: ReactNode;
}

/**
 * Page section framed by a gutter on each side. Each direct child of the body
 * is separated by a rule. Use inside `SiteMain`.
 */
export function SiteContent({
  heading,
  children,
  headingPlacement = "side",
  aside,
}: SiteContentProps) {
  const showAside = headingPlacement === "top" && Boolean(aside);

  return (
    <SiteContentRoot headingPlacement={headingPlacement} hasAside={showAside}>
      <SiteContentGutter />
      <SiteContentHeader>
        <SiteContentHeading>{heading}</SiteContentHeading>
      </SiteContentHeader>
      <SiteContentBody>{children}</SiteContentBody>
      {showAside ? <SiteContentAside>{aside}</SiteContentAside> : null}
      <SiteContentGutter />
    </SiteContentRoot>
  );
}
