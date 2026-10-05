import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

const focusRing = {
  outline: "2px solid {colors.colorPalette.focusRing}",
  outlineOffset: "-2px",
};

// Logo and links are square icon controls of different sizes.
const iconControl = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "fg",
  borderRadius: "6px",
  textDecoration: "none",
  _hover: { bg: "bg.muted" },
  _focusVisible: focusRing,
  _icon: { flexShrink: 0 },
};

/** The parts GlobalNav adds to TopNav, whose bar and regions it reuses as they are. */
export const globalNavSlotRecipe = defineSlotRecipe({
  className: "global-nav",
  slots: ["root", "logo", "search", "searchLabel", "link"],
  base: {
    root: {},
    logo: {
      ...iconControl,
      boxSize: "40px",
      _icon: { flexShrink: 0, boxSize: "28px" },
    },
    search: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      maxWidth: "320px",
      marginInlineStart: "auto",
      paddingInline: "12px",
      paddingBlock: "6px",
      color: "fg.muted",
      fontSize: "14px",
      lineHeight: "20px",
      textAlign: "start",
      borderWidth: "1px",
      borderColor: "border",
      borderRadius: "6px",
      cursor: "pointer",
      _hover: { borderColor: "border.emphasized" },
      _focusVisible: focusRing,
      _icon: { flexShrink: 0, boxSize: "16px" },
    },
    searchLabel: {
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    link: {
      ...iconControl,
      boxSize: "32px",
      _icon: { flexShrink: 0, boxSize: "16px" },
      _currentPage: { bg: "bg.muted" },
    },
  },
});

export type GlobalNavVariantProps = RecipeVariantProps<typeof globalNavSlotRecipe>;
