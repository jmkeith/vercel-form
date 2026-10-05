import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

// Rows indent 8px per level. The list sets how far; ActionList's rows read it.
const indent = (level: number) => ({ "--action-list-indent": `${level * 8}px` });

/**
 * NavList is an ActionList inside a `nav`: rows, visuals, groups and dividers are ActionList's
 * parts and take their styles from its recipe. Only what NavList adds is styled here.
 */
export const navListSlotRecipe = defineSlotRecipe({
  className: "nav-list",
  slots: ["root", "branch", "chevron", "subNav"],
  base: {
    root: {
      display: "block",
    },
    // An expandable parent: its own row, then its sub nav.
    branch: {
      listStyle: "none",
    },
    chevron: {
      gridArea: "trailing",
      display: "flex",
      alignItems: "center",
      minHeight: "20px",
      marginInlineStart: "8px",
      color: "fg.muted",
      _icon: { flexShrink: 0, boxSize: "16px" },
      _open: { transform: "scaleY(-1)" },
    },
    subNav: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      ...indent(1),
      "& .nav-list__subNav": {
        ...indent(2),
        "& .nav-list__subNav": { ...indent(3), "& .nav-list__subNav": indent(4) },
      },
      "& .action-list__itemContent": { fontSize: "12px" },
    },
  },
});

export type NavListVariantProps = RecipeVariantProps<typeof navListSlotRecipe>;
