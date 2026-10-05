import { defineSlotRecipe } from "@chakra-ui/react";

const sectionPadding = { base: "16px", sm: "24px", md: "32px" };

export const siteContentRecipe = defineSlotRecipe({
  className: "vc-site-content",
  slots: [
    "root",
    "gutter",
    "header",
    "heading",
    "body",
    "aside",
    "block",
    "item",
    "itemTitle",
    "itemDescription",
  ],
  base: {
    root: {
      display: "grid",
      gridTemplateColumns: { base: "minmax(0, 1fr)", lg: "repeat(12, minmax(0, 1fr))" },
      "& > :not(:last-child)": {
        borderRight: { base: "0", lg: "1px solid {colors.ds.gray.400}" },
      },
    },
    gutter: { gridColumn: { lg: "span 1 / span 1" } },
    header: { gridColumn: { lg: "span 3 / span 3" }, padding: sectionPadding },
    heading: {
      fontWeight: 600,
      letterSpacing: "-0.025em",
      color: "ds.gray.1000",
      fontSize: { base: "24px", sm: "30px", md: "36px" },
      lineHeight: { base: "32px", sm: "36px", md: "40px" },
    },
    body: {
      gridColumn: { lg: "span 7 / span 7" },
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr)",
      alignContent: "start",
      "& > :not(:last-child)": { borderBottom: "1px solid {colors.ds.gray.400}" },
    },
    // Side panel next to the body; its content stays in view while the body scrolls.
    aside: {
      minWidth: 0,
      padding: sectionPadding,
      "& > *": {
        position: { lg: "sticky" },
        top: { lg: "calc({sizes.header} + 32px)" },
      },
    },
    block: { padding: sectionPadding, color: "ds.gray.1000" },
    item: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: "8px",
      padding: sectionPadding,
      color: "ds.gray.1000",
      textDecoration: "none",
      cursor: "pointer",
      transition:
        "color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: { backgroundColor: "ds.gray.100" },
      _focusVisible: { outline: "2px solid {colors.ds.focus}", outlineOffset: "4px" },
    },
    itemTitle: {
      fontWeight: 600,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: { base: "18px", sm: "20px", md: "24px" },
      lineHeight: { base: "28px", md: "32px" },
    },
    itemDescription: {
      lineClamp: 2,
      textWrap: "balance",
      color: "ds.gray.700",
      fontSize: { base: "14px", sm: "16px" },
      lineHeight: { base: "20px", sm: "24px" },
    },
  },
  variants: {
    headingPlacement: {
      // Heading in its own column beside the body.
      side: {},
      // Heading in a full-width row above the body (and the aside, if any).
      top: {
        gutter: {
          gridRow: { lg: "1 / span 2" },
          "&:first-child": { gridColumn: { lg: "1" } },
          "&:last-child": { gridColumn: { lg: "12" } },
        },
        header: {
          gridColumn: { lg: "2 / span 10" },
          gridRow: { lg: "1" },
          borderBottom: "1px solid {colors.ds.gray.400}",
        },
        body: { gridColumn: { lg: "2 / span 10" }, gridRow: { lg: "2" } },
        aside: {
          gridColumn: { lg: "9 / span 3" },
          gridRow: { lg: "2" },
          borderTop: { base: "1px solid {colors.ds.gray.400}", lg: "0" },
        },
      },
    },
    hasAside: { true: {}, false: {} },
  },
  compoundVariants: [
    {
      headingPlacement: "top",
      hasAside: true,
      css: { body: { gridColumn: { lg: "2 / span 7" } } },
    },
  ],
  defaultVariants: { headingPlacement: "side", hasAside: false },
});
