import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

const focusRing = { outline: "2px solid {colors.colorPalette.focusRing}", outlineOffset: "0" };

// A leading/trailing visual: as tall as the first line of the label, so it centres on it.
const visual = {
  display: "flex",
  alignItems: "center",
  minWidth: "max-content",
  minHeight: "20px",
  lineHeight: "20px",
  fontWeight: 400,
  color: "var(--action-list-visual)",
  _icon: { flexShrink: 0, boxSize: "16px" },
};

// Second line of a row: under the label, clear of the visuals on either side.
const underLabel = { gridColumn: "label-start / description-end", fontWeight: 400 };

// Accent bar left of the current row.
const currentBar = {
  content: '""',
  position: "absolute",
  top: "calc(50% - 12px)",
  left: "-8px",
  width: "4px",
  height: "24px",
  borderRadius: "6px",
  background: "colorPalette.solid",
};

// The box shared by the checkbox and the radio.
const control = {
  background: "bg",
  border: "1px solid {colors.border.emphasized}",
  transition: "background-color, border-color 80ms cubic-bezier(0.33, 1, 0.68, 1)",
  _disabled: { background: "bg.muted", borderColor: "border.muted" },
};

// The row divider starts at the label: past the indicator and the leading visual, if any.
const dividerStart =
  "calc(8px + var(--action-list-selection-width, 0px) + var(--action-list-leading-width, 0px))";
const noDivider = { _before: { display: "none" } };

const inset = { item: { marginInline: "8px" }, heading: { marginInlineStart: "16px" } };

export const actionListSlotRecipe = defineSlotRecipe({
  className: "action-list",
  slots: [
    "root",
    "heading",
    "item",
    "itemContent",
    "itemIndicator",
    "itemLabel",
    "itemStatus",
    "leadingVisual",
    "trailingVisual",
    "description",
    "inactiveText",
    "trailingAction",
    "divider",
    "group",
    "groupHeading",
    "groupList",
  ],
  base: {
    root: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
    heading: {
      margin: 0,
      marginBlockEnd: "8px",
      color: "fg",
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "32px",
      "&[data-size=small]": { fontSize: "16px", lineHeight: "24px" },
      "&[data-size=large]": { fontSize: "32px", lineHeight: "48px" },
    },
    // The row. It carries the row-wide states (`data-current`, `data-disabled`, ...) and hands
    // its colours down to the parts through the two custom properties.
    item: {
      "--action-list-fg": "{colors.fg}",
      "--action-list-visual": "{colors.fg.muted}",
      position: "relative",
      display: "flex",
      listStyle: "none",
      borderRadius: "6px",
      fontWeight: 400,
      transition: "background 33.333ms linear",
      _hover: { background: "bg.muted" },
      _active: { background: "bg.emphasized" },
      _current: {
        background: "bg.muted",
        fontWeight: 600,
        // Keeps the current row visible in forced-colors mode.
        outline: "2px solid transparent",
        _after: currentBar,
      },
      "&[data-variant=danger]": {
        "--action-list-fg": "{colors.fg.error}",
        "--action-list-visual": "{colors.fg.error}",
        _hover: { background: "bg.error" },
        _active: { background: "red.muted" },
      },
      _loading: { "--action-list-fg": "{colors.fg.muted}" },
      _disabled: {
        "--action-list-fg": "{colors.fg.subtle}",
        "--action-list-visual": "{colors.fg.subtle}",
      },
      "&[data-inactive]": { "--action-list-fg": "{colors.fg.muted}" },
    },
    // The button or link filling the row: [selection] [leading] [label] [description] [trailing].
    itemContent: {
      position: "relative",
      display: "grid",
      gridTemplateAreas: "'selection leading label description trailing status'",
      gridTemplateColumns:
        "min-content min-content minmax(0, auto) minmax(0, 1fr) min-content min-content",
      alignItems: "start",
      flex: "1",
      minWidth: 0,
      paddingBlock: "6px",
      paddingInlineStart: "calc(8px + var(--action-list-indent, 0px))",
      paddingInlineEnd: "8px",
      color: "var(--action-list-fg)",
      fontFamily: "inherit",
      fontSize: "14px",
      fontWeight: "inherit",
      lineHeight: "20px",
      textAlign: "start",
      textDecoration: "none",
      wordBreak: "break-word",
      background: "transparent",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      userSelect: "none",
      touchAction: "manipulation",
      WebkitTapHighlightColor: "transparent",
      // Zero-width stand-ins that keep the first two columns taken, so a bare text child is
      // always auto-placed in `label`, with or without an indicator or a leading visual.
      _before: { content: '""', gridArea: "selection" },
      _after: { content: '""', gridArea: "leading" },
      _focusVisible: focusRing,
      _disabled: { cursor: "not-allowed" },
      // The label is semibold above a block description.
      "&:has(> .action-list__description[data-variant=block])": { fontWeight: 600 },
    },
    // Shape and checked look come from the root's `selectionVariant`.
    itemIndicator: {
      gridArea: "selection",
      display: "grid",
      placeContent: "center",
      boxSize: "16px",
      marginBlock: "2px",
      marginInlineEnd: "8px",
      color: "var(--action-list-visual)",
      _icon: { visibility: "hidden" },
      _checked: { _icon: { visibility: "visible" } },
    },
    itemLabel: {
      gridArea: "label",
      minWidth: 0,
    },
    itemStatus: {
      ...visual,
      gridArea: "status",
      marginInlineStart: "8px",
    },
    leadingVisual: {
      ...visual,
      gridArea: "leading",
      marginInlineEnd: "8px",
      pointerEvents: "none",
    },
    trailingVisual: {
      ...visual,
      gridArea: "trailing",
      marginInlineStart: "8px",
      fontSize: "14px",
      pointerEvents: "none",
    },
    // Inline by default: beside the label, on its line.
    description: {
      gridArea: "description",
      minWidth: 0,
      marginInlineStart: "8px",
      color: "fg.muted",
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "20px",
      "&[data-variant=block]": {
        ...underLabel,
        gridRow: "2",
        marginInlineStart: 0,
        marginBlockStart: "4px",
        lineHeight: "16px",
      },
      "[aria-disabled=true] > &": { color: "inherit" },
    },
    // Why an inactive row cannot be used, spelled out under the label.
    inactiveText: {
      ...underLabel,
      gridRow: "3",
      color: "fg.warning",
      fontSize: "12px",
      lineHeight: "16px",
    },
    // A second control on the row's right edge: icon-only, or a short text label.
    trailingAction: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      minWidth: "32px",
      minHeight: "32px",
      paddingInline: "12px",
      color: "fg",
      fontFamily: "inherit",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
      textDecoration: "none",
      whiteSpace: "nowrap",
      background: "transparent",
      border: "none",
      borderRadius: "0 6px 6px 0",
      cursor: "pointer",
      "&:has(> svg)": { paddingInline: "8px" },
      _icon: { flexShrink: 0, boxSize: "16px", color: "fg.muted" },
      _hover: { background: "bg.emphasized" },
      _focusVisible: { ...focusRing, outlineOffset: "-2px" },
      _disabled: { cursor: "not-allowed" },
    },
    divider: {
      display: "block",
      height: "1px",
      padding: 0,
      marginBlockStart: "7px",
      marginBlockEnd: "8px",
      listStyle: "none",
      background: "border.muted",
      // A list never opens with a divider.
      _first: { display: "none" },
    },
    group: {
      listStyle: "none",
      "&:not(:first-child)": { marginBlockStart: "8px" },
    },
    groupHeading: {
      display: "block",
      margin: 0,
      paddingBlock: "6px",
      paddingInline: "16px",
      color: "fg.muted",
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: "18px",
      "&[data-variant=filled]": {
        marginBlockEnd: "8px",
        background: "bg.subtle",
        borderBlock: "1px solid {colors.border.muted}",
      },
      // A heading may be a link to the group's own page.
      "& > a": { color: "fg", textDecoration: "inherit", _hover: { textDecoration: "underline" } },
    },
    // Key order matches the site footer's identical list reset: Chakra caches equal style
    // objects regardless of key order, so a different order here hydrates with a mismatch.
    groupList: {
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
  },
  variants: {
    /** `inset` rows are offset from the list's edges, `full` rows are flush with them. */
    variant: {
      inset: { ...inset, root: { paddingBlock: "8px" } },
      "horizontal-inset": { ...inset, root: { paddingBlockEnd: "8px" } },
      full: { heading: { marginInlineStart: "8px" } },
    },
    /** A hairline above every row but the first, starting where the label starts. */
    showDividers: {
      true: {
        item: {
          _before: {
            content: '""',
            position: "absolute",
            top: "-1px",
            insetInlineStart: dividerStart,
            insetInlineEnd: "8px",
            height: "1px",
            background: "border.muted",
          },
          "&:has(.action-list__leadingVisual)": { "--action-list-leading-width": "24px" },
          // Not on the first row, after a divider or the heading, or around a highlighted row.
          "&:first-of-type, [role=presentation] + &": noDivider,
          "&:is(:hover, [data-current]), &:is(:hover, [data-current]) + &": noDivider,
        },
      },
    },
    /** Adds the matching indicator to every `Item`. Leave unset for a list without selection. */
    selectionVariant: {
      single: {
        item: { "--action-list-selection-width": "24px" },
        itemIndicator: { _icon: { boxSize: "16px" } },
      },
      multiple: {
        item: { "--action-list-selection-width": "24px" },
        itemIndicator: {
          ...control,
          borderRadius: "3px",
          _icon: { boxSize: "12px", color: "colorPalette.contrast" },
          _checked: {
            background: "colorPalette.solid",
            borderColor: "colorPalette.solid",
            _disabled: { background: "bg.emphasized", borderColor: "bg.emphasized" },
          },
        },
      },
      radio: {
        item: { "--action-list-selection-width": "24px" },
        itemIndicator: {
          ...control,
          borderRadius: "full",
          _icon: { display: "none" },
          _checked: {
            borderWidth: "4px",
            borderColor: "colorPalette.solid",
            _disabled: { borderColor: "bg.emphasized" },
          },
        },
      },
    },
    /** Row height: 32px or 40px. */
    size: {
      medium: {},
      large: { itemContent: { paddingBlock: "10px" } },
    },
  },
  defaultVariants: { variant: "inset", size: "medium" },
});

export type ActionListVariantProps = RecipeVariantProps<typeof actionListSlotRecipe>;
