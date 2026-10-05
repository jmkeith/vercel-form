import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

const hidden = { display: "none" };

// What a row keeps in the icon-only rail is its leading visual; these parts of the ActionList
// and NavList rows inside the sidebar are dropped there.
const railHidden = {
  "& .action-list__trailingVisual": hidden,
  "& .action-list__trailingAction": hidden,
  "& .action-list__description": hidden,
  "& .action-list__itemStatus": hidden,
  "& .action-list__inactiveText": hidden,
  "& .action-list__groupHeading": hidden,
  "& .nav-list__chevron": hidden,
  "& .nav-list__subNav": hidden,
};

export const collapsibleSidebarSlotRecipe = defineSlotRecipe({
  className: "collapsible-sidebar",
  slots: ["root", "body", "footer", "resizeHandle"],
  base: {
    root: {
      // Sticks below whatever `--page-layout-sticky-offset` says is above it (a site header).
      "--collapsible-sidebar-offset": "var(--page-layout-sticky-offset, 0px)",
      position: "sticky",
      top: "var(--collapsible-sidebar-offset)",
      alignSelf: "flex-start",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      boxSizing: "border-box",
      height: "calc(100dvh - var(--collapsible-sidebar-offset))",
      overflow: "clip",
      color: "fg",
      bg: "bg",
      borderInlineEndWidth: "1px",
      borderColor: "border",
      transition: "width 200ms ease",
      _motionReduce: { transition: "none" },
      // Resizing sets the width directly: no easing while the handle is dragged or focused.
      "&:has(.collapsible-sidebar__resizeHandle:is(:focus, [data-dragging]))": {
        transition: "none",
      },
      // Rows never wrap: they are clipped while the width animates and in the rail.
      "& .action-list__itemContent, & .action-list__groupHeading": {
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
    },
    body: {
      flex: 1,
      minHeight: 0,
      overflowX: "hidden",
      overflowY: "auto",
    },
    footer: {
      flexShrink: 0,
      borderTopWidth: "1px",
      borderColor: "border.muted",
    },
    resizeHandle: {
      position: "absolute",
      insetBlock: 0,
      insetInlineEnd: 0,
      width: "5px",
      cursor: "col-resize",
      touchAction: "none",
      userSelect: "none",
      _hover: { bg: "border.emphasized" },
      _focusVisible: { outline: "2px solid {colors.colorPalette.focusRing}", outlineOffset: "-2px" },
      "&[data-dragging]": { bg: "colorPalette.solid" },
    },
  },
  variants: {
    /** `false` shrinks the sidebar to a 64px rail that shows only each row's leading visual. */
    expanded: {
      true: {
        root: {
          width: "var(--collapsible-sidebar-width, var(--collapsible-sidebar-size))",
          "&[data-resizable]": { minWidth: "240px", maxWidth: "min(480px, 100vw - 320px)" },
        },
      },
      false: {
        root: {
          width: "64px",
          // A row is just wide enough for its 16px visual, centred in the rail.
          "& .action-list__item": { width: "32px", marginInline: "auto" },
          ...railHidden,
        },
      },
    },
    /** Width while expanded, on the scale of PageLayout's panes. */
    size: {
      small: { root: { "--collapsible-sidebar-size": "256px" } },
      medium: { root: { "--collapsible-sidebar-size": "296px" } },
      large: { root: { "--collapsible-sidebar-size": "320px" } },
    },
  },
  defaultVariants: { expanded: true, size: "small" },
});

export type CollapsibleSidebarVariantProps = RecipeVariantProps<typeof collapsibleSidebarSlotRecipe>;
