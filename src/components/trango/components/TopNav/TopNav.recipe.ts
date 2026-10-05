import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

// Left, center and right share this row layout; only their padding differs.
const region = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  paddingBlock: "16px",
};

export const topNavSlotRecipe = defineSlotRecipe({
  className: "top-nav",
  slots: ["root", "above", "bar", "left", "center", "right", "local"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: "fg",
      bg: "bg.subtle",
      // A bottom edge that takes no height, so the bar keeps its size with or without it.
      boxShadow: "inset 0 -1px 0 {colors.border}",
    },
    // Banners above the bar keep their own layout.
    above: {
      display: "contents",
    },
    bar: {
      display: "flex",
      alignItems: "center",
    },
    left: {
      ...region,
      paddingInline: "16px 8px",
    },
    center: {
      ...region,
      flex: 1,
      minWidth: 0,
      justifyContent: { base: "flex-end", lg: "flex-start" },
    },
    right: {
      ...region,
      paddingInline: { base: "0 16px", sm: "8px 16px" },
    },
    // Local navigation (tabs) under the bar.
    local: {
      display: "flex",
      alignItems: "center",
      minWidth: 0,
      paddingInline: "16px",
      fontSize: "14px",
    },
  },
  variants: {
    /** Tightens the bar's bottom padding to sit closer to a `Local` row under it. */
    hasLocalNavigation: {
      true: {
        left: { paddingBottom: "4px" },
        center: { paddingBottom: "4px" },
        right: { paddingBottom: "4px" },
      },
    },
  },
});

export type TopNavVariantProps = RecipeVariantProps<typeof topNavSlotRecipe>;
