import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

// Variants only set these custom properties on the root; the parts read them in `base`.
// Spacing ones hold a length, divider ones hold 0 or 1 so they can be multiplied in `calc()`.
const padding = "var(--page-layout-padding)";
const rowGap = "var(--page-layout-row-gap)";
const columnGap = "var(--page-layout-column-gap)";
const regionPadding = "var(--page-layout-region-padding)";

const spacing = {
  none: "0px",
  condensed: "16px",
  /** 16px, 24px from `lg`. */
  normal: "var(--page-layout-spacing-normal)",
};

type Side = "start" | "end";

// Writes a logical two-value shorthand ("start end") whose `towards` side gets `extra` added.
const pair = (towards: Side, extra: string, both = "0px") =>
  towards === "start" ? `calc(${both} + ${extra}) ${both}` : `${both} calc(${both} + ${extra})`;

/**
 * Header and footer: a full-width band that keeps the row gap towards the content. With a
 * divider it draws a line there and repeats the gap inside it. Below `md` the line bleeds
 * through the root padding to the edges of the layout.
 */
const band = (name: "header" | "footer") => {
  const towards: Side = name === "header" ? "end" : "start";
  const line = `var(--page-layout-${name}-divider)`;
  return {
    "--bleed": { base: `calc(${padding} * ${line})`, md: "0px" },
    gridArea: name,
    minWidth: 0,
    marginBlock: pair(towards, rowGap),
    marginInline: "calc(var(--bleed) * -1)",
    paddingBlock: pair(towards, `${rowGap} * ${line}`, regionPadding),
    paddingInline: `calc(${regionPadding} + var(--bleed))`,
    borderBlockWidth: pair(towards, `1px * ${line}`),
    borderColor: "border",
  };
};

/**
 * Pane and sidebar: a column beside the content from `md`, a band above or below it when
 * stacked. `--gap-*` and `--line-*` hold the gap and divider for whichever axis is in use.
 */
const column = (name: "pane" | "sidebar") => ({
  "--gap-block": { base: rowGap, md: "0px" },
  "--gap-inline": { base: "0px", md: columnGap },
  "--line-block": { base: `var(--page-layout-${name}-divider)`, md: "0" },
  "--line-inline": { base: "0", md: `var(--page-layout-${name}-divider)` },
  "--bleed": `calc(${padding} * var(--line-block))`,
  minWidth: 0,
  borderColor: "border",
  overflow: { md: "auto" },
});

// Room the divider line and the gap inside it add to a column's width.
const lineWidth = "(var(--gap-inline) + 1px) * var(--line-inline)";

/** Gap, divider line and inner gap on the side of a column that faces the content. */
const facing = (towards: Side) => ({
  marginBlock: pair(towards, "var(--gap-block)"),
  marginInline: pair(towards, "var(--gap-inline)", "calc(var(--bleed) * -1)"),
  paddingBlock: pair(towards, "var(--gap-block) * var(--line-block)", regionPadding),
  paddingInline: pair(
    towards,
    "var(--gap-inline) * var(--line-inline)",
    `calc(${regionPadding} + var(--bleed))`,
  ),
  borderBlockWidth: pair(towards, "1px * var(--line-block)"),
  borderInlineWidth: pair(towards, "1px * var(--line-inline)"),
});

// The 5px handle is centred on the pane's divider, one column gap in from the content.
const handleInset = `calc(${columnGap} - 2px)`;

export const pageLayoutSlotRecipe = defineSlotRecipe({
  className: "page-layout",
  slots: ["root", "header", "content", "pane", "resizeHandle", "sidebar", "footer"],
  base: {
    root: {
      "--page-layout-spacing-normal": { base: "16px", lg: "24px" },
      "--page-layout-pane-small": { base: "240px", lg: "256px" },
      "--page-layout-pane-medium": { base: "256px", lg: "296px" },
      "--page-layout-pane-large": { base: "256px", lg: "320px" },
      // Widest a resizable pane may get, leaving room for the content.
      "--page-layout-pane-max-width": { base: "calc(100vw - 511px)", xl: "calc(100vw - 959px)" },
      // Parts are placed by area, so their DOM order does not matter and absent ones collapse.
      display: "grid",
      gridTemplateColumns: { base: "minmax(0, 1fr)", md: "auto auto minmax(0, 1fr) auto auto" },
      gridTemplateRows: { base: "repeat(3, auto) 1fr repeat(3, auto)", md: "auto 1fr auto" },
      gridTemplateAreas: {
        base: "'sidebar-start' 'header' 'pane-start' 'content' 'pane-end' 'footer' 'sidebar-end'",
        md: [
          "'sidebar-start header header header sidebar-end'",
          "'sidebar-start pane-start content pane-end sidebar-end'",
          "'sidebar-start footer footer footer sidebar-end'",
        ].join(" "),
      },
      // Containing block of the resize handle.
      position: "relative",
      boxSizing: "border-box",
      width: "100%",
      marginInline: "auto",
      padding,
      color: "fg",
    },
    header: band("header"),
    content: {
      gridArea: "content",
      minWidth: 0,
      width: "100%",
      marginInline: "auto",
      padding: regionPadding,
    },
    pane: {
      ...column("pane"),
      // `--page-layout-pane-width` is the width set by dragging the resize handle.
      width: { md: `var(--page-layout-pane-width, calc(var(--pane-size) + ${lineWidth}))` },
      // Set by `resizable`: always show the line that is dragged, and clamp the custom width.
      "&[data-resizable]": {
        md: {
          "--line-inline": "1",
          minWidth: "256px",
          maxWidth: "var(--page-layout-pane-max-width)",
        },
      },
    },
    resizeHandle: {
      display: { base: "none", md: "block" },
      position: "absolute",
      insetBlock: 0,
      zIndex: 1,
      width: "5px",
      cursor: "col-resize",
      // No scrolling or text selection while dragging.
      touchAction: "none",
      userSelect: "none",
      outline: "none",
      _before: {
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundColor: "border.emphasized",
        opacity: 0,
        transition: "opacity 150ms ease",
      },
      _hover: { _before: { opacity: 1 } },
      _focusVisible: { outline: "2px solid {colors.colorPalette.focusRing}" },
      _dragging: {
        _before: { backgroundColor: "colorPalette.solid", opacity: 1, transition: "none" },
      },
    },
    sidebar: {
      ...column("sidebar"),
      width: { md: `calc(var(--page-layout-pane-medium) + ${lineWidth})` },
    },
    footer: band("footer"),
  },
  variants: {
    /** Max width of the whole layout, centred. */
    containerWidth: {
      full: { root: { maxWidth: "none" } },
      medium: { root: { maxWidth: `calc(768px + 2 * ${padding})` } },
      large: { root: { maxWidth: `calc(1012px + 2 * ${padding})` } },
      xlarge: { root: { maxWidth: `calc(1280px + 2 * ${padding})` } },
    },
    /** Max width of the content, centred in its column. */
    contentWidth: {
      full: { content: { maxWidth: "none" } },
      medium: { content: { maxWidth: "768px" } },
      large: { content: { maxWidth: "1012px" } },
      xlarge: { content: { maxWidth: "1280px" } },
    },
    /** Space around the layout. */
    padding: {
      none: { root: { "--page-layout-padding": spacing.none } },
      condensed: { root: { "--page-layout-padding": spacing.condensed } },
      normal: { root: { "--page-layout-padding": spacing.normal } },
    },
    /** Space between header, content and footer, and around the pane when stacked. */
    rowGap: {
      none: { root: { "--page-layout-row-gap": spacing.none } },
      condensed: { root: { "--page-layout-row-gap": spacing.condensed } },
      normal: { root: { "--page-layout-row-gap": spacing.normal } },
    },
    /** Space between pane, content and sidebar. */
    columnGap: {
      none: { root: { "--page-layout-column-gap": spacing.none } },
      condensed: { root: { "--page-layout-column-gap": spacing.condensed } },
      normal: { root: { "--page-layout-column-gap": spacing.normal } },
    },
    /** Padding inside header, content, pane, sidebar and footer. */
    regionPadding: {
      none: { root: { "--page-layout-region-padding": spacing.none } },
      condensed: { root: { "--page-layout-region-padding": spacing.condensed } },
      normal: { root: { "--page-layout-region-padding": spacing.normal } },
    },
    /**
     * Side of the content the pane sits on; below `md` it stacks above (start) or below (end).
     * Takes responsive values, e.g. `{ base: "end", md: "start" }`.
     */
    panePosition: {
      start: {
        pane: { gridArea: "pane-start", ...facing("end") },
        resizeHandle: { gridArea: "pane-start", insetInline: `auto ${handleInset}` },
      },
      end: {
        pane: { gridArea: "pane-end", ...facing("start") },
        resizeHandle: { gridArea: "pane-end", insetInline: `${handleInset} auto` },
      },
    },
    /** Pane width from `md`; the pane is full width when stacked. Each step grows at `lg`. */
    paneWidth: {
      small: { pane: { "--pane-size": "var(--page-layout-pane-small)" } },
      medium: { pane: { "--pane-size": "var(--page-layout-pane-medium)" } },
      large: { pane: { "--pane-size": "var(--page-layout-pane-large)" } },
    },
    /** Pane sticks below `--page-layout-sticky-offset` and scrolls on its own when too tall. */
    sticky: {
      true: {
        pane: {
          md: {
            position: "sticky",
            top: "var(--page-layout-sticky-offset, 0px)",
            maxHeight: "calc(100dvh - var(--page-layout-sticky-offset, 0px))",
          },
        },
      },
    },
    sidebarPosition: {
      start: { sidebar: { gridArea: "sidebar-start", ...facing("end") } },
      end: { sidebar: { gridArea: "sidebar-end", ...facing("start") } },
    },
    /** Line between a part and the content; a resizable pane always shows one from `md`. */
    headerDivider: {
      none: { root: { "--page-layout-header-divider": "0" } },
      line: { root: { "--page-layout-header-divider": "1" } },
    },
    paneDivider: {
      none: { root: { "--page-layout-pane-divider": "0" } },
      line: { root: { "--page-layout-pane-divider": "1" } },
    },
    sidebarDivider: {
      none: { root: { "--page-layout-sidebar-divider": "0" } },
      line: { root: { "--page-layout-sidebar-divider": "1" } },
    },
    footerDivider: {
      none: { root: { "--page-layout-footer-divider": "0" } },
      line: { root: { "--page-layout-footer-divider": "1" } },
    },
  },
  defaultVariants: {
    containerWidth: "xlarge",
    contentWidth: "full",
    padding: "normal",
    rowGap: "normal",
    columnGap: "normal",
    regionPadding: "none",
    panePosition: "end",
    paneWidth: "medium",
    sidebarPosition: "start",
    headerDivider: "none",
    paneDivider: "none",
    sidebarDivider: "none",
    footerDivider: "none",
  },
});

export type PageLayoutVariantProps = RecipeVariantProps<typeof pageLayoutSlotRecipe>;
