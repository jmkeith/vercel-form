import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

/** What SidebarPageLayout adds to PageLayout, whose grid and regions it reuses as they are. */
export const sidebarPageLayoutSlotRecipe = defineSlotRecipe({
  className: "sidebar-page-layout",
  slots: ["root", "sidebar", "trigger"],
  base: {
    // At least as tall as the space under the site header, so the sidebar has room to stick.
    root: {
      minHeight: "calc(100dvh - var(--page-layout-sticky-offset, 0px))",
    },
    // The rail takes PageLayout's start sidebar column from `md`; below it a drawer stands in.
    sidebar: {
      gridArea: "sidebar-start",
      display: { base: "none", md: "flex" },
    },
    // Opens the drawer, so it only shows where the rail does not.
    trigger: {
      display: { base: "inline-flex", md: "none" },
    },
  },
});

export type SidebarPageLayoutVariantProps = RecipeVariantProps<typeof sidebarPageLayoutSlotRecipe>;
