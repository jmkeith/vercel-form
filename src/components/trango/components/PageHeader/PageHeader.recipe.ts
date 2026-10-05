import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

const bodyText = { fontSize: "14px", fontWeight: 400, lineHeight: "20px" };

// Boxes beside the title are as tall as its first line, so their content centres on it.
const titleLineHeight = "calc(var(--title-line-height) * 1em)";

// Shown only below `md`: context for where the user is, in place of breadcrumbs.
const narrowOnly = { base: "flex", md: "none" };
// Shown only from `md` up.
const regularUp = { base: "none", md: "flex" };

export const pageHeaderSlotRecipe = defineSlotRecipe({
  className: "page-header",
  slots: [
    "root",
    "contextArea",
    "parentLink",
    "contextBar",
    "contextAreaActions",
    "titleArea",
    "leadingAction",
    "breadcrumbs",
    "leadingVisual",
    "title",
    "trailingVisual",
    "trailingAction",
    "actions",
    "description",
    "navigation",
  ],
  base: {
    root: {
      display: "grid",
      gridTemplateColumns: "auto auto auto auto 1fr",
      gridTemplateAreas: [
        "'context-area context-area context-area context-area context-area'",
        "'leading-action breadcrumbs title-area trailing-action actions'",
        "'description description description description description'",
        "'navigation navigation navigation navigation navigation'",
      ].join(" "),
      color: "fg",
    },
    contextArea: {
      gridArea: "context-area",
      display: narrowOnly,
      alignItems: "center",
      gap: "8px",
      paddingBottom: "8px",
      ...bodyText,
    },
    parentLink: {
      display: narrowOnly,
      alignItems: "center",
      gap: "8px",
      order: 0,
      color: "fg.muted",
      textDecoration: "none",
      _hover: { color: "colorPalette.fg" },
      _focusVisible: {
        outline: "2px solid {colors.colorPalette.focusRing}",
        outlineOffset: "-2px",
      },
      _icon: { flexShrink: 0, boxSize: "16px" },
    },
    contextBar: {
      display: narrowOnly,
      order: 1,
    },
    contextAreaActions: {
      display: narrowOnly,
      order: 2,
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
    },
    titleArea: {
      gridArea: "title-area",
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    },
    leadingAction: {
      gridArea: "leading-action",
      display: regularUp,
      alignItems: "center",
      height: titleLineHeight,
      paddingRight: "8px",
    },
    breadcrumbs: {
      gridArea: "breadcrumbs",
      display: "flex",
      alignItems: "center",
      paddingRight: "8px",
      ...bodyText,
    },
    leadingVisual: {
      display: "flex",
      alignItems: "center",
      order: 0,
      height: titleLineHeight,
    },
    title: {
      display: "block",
      order: 1,
      margin: 0,
      fontSize: "inherit",
      fontWeight: "inherit",
      lineHeight: "inherit",
    },
    trailingVisual: {
      display: "flex",
      alignItems: "center",
      order: 2,
      height: titleLineHeight,
    },
    trailingAction: {
      gridArea: "trailing-action",
      display: regularUp,
      alignItems: "center",
      height: titleLineHeight,
      paddingLeft: "8px",
    },
    actions: {
      gridArea: "actions",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
      minWidth: "max-content",
      height: titleLineHeight,
      paddingLeft: "8px",
    },
    description: {
      gridArea: "description",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      paddingTop: "8px",
      ...bodyText,
    },
    navigation: {
      gridArea: "navigation",
      display: "block",
      paddingTop: "8px",
      ...bodyText,
    },
  },
  variants: {
    /** Title size. Takes responsive values, e.g. `{ base: "medium", md: "large" }`. */
    size: {
      subtitle: {
        root: { fontSize: "20px", fontWeight: 400, lineHeight: 1.6, "--title-line-height": "1.6" },
      },
      medium: {
        root: { fontSize: "20px", fontWeight: 600, lineHeight: 1.6, "--title-line-height": "1.6" },
      },
      large: {
        root: { fontSize: "32px", fontWeight: 400, lineHeight: 1.5, "--title-line-height": "1.5" },
      },
    },
    /** Bottom border, drawn unless a navigation part supplies its own edge. */
    hasBorder: {
      true: {
        root: {
          "&:not(:has(> .page-header__navigation))": {
            borderBlockEnd: "1px solid {colors.border}",
            paddingBlockEnd: "8px",
          },
        },
      },
    },
  },
  defaultVariants: { size: "medium" },
});

export type PageHeaderVariantProps = RecipeVariantProps<typeof pageHeaderSlotRecipe>;
