import { defineSlotRecipe } from "@chakra-ui/react";

export const choiceFieldSlotRecipe = defineSlotRecipe({
  className: "choice-field",
  slots: ["root", "legend", "group", "item", "control", "indicator", "label", "errorText"],
  base: {
    root: { display: "block", minWidth: 0, margin: 0, padding: 0, border: 0 },
    legend: {
      // <legend> ignores margins unless it is taken out of the fieldset's border flow.
      float: "left",
      width: "100%",
      marginBottom: "16px",
      padding: 0,
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.gray.900",
      "& a": { color: "ds.link", textDecoration: "none" },
    },
    group: { display: "flex", clear: "both" },
    item: {
      position: "relative",
      display: "inline-flex",
      fontSize: "13px",
      lineHeight: "19.5px",
      color: "ds.gray.1000",
      cursor: "pointer",
      "&:hover [data-choice-control]:not([data-state=checked])": {
        backgroundColor: "ds.gray.200",
      },
    },
    control: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: "16px",
      height: "16px",
      backgroundColor: "ds.background.100",
      border: "1px solid {colors.ds.gray.700}",
      "&[data-state=checked]": { borderColor: "ds.gray.1000" },
      "&[data-focus-visible]": { boxShadow: "focusRing" },
    },
    indicator: {},
    label: { marginLeft: "8px" },
    errorText: {
      display: "block",
      marginTop: "8px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.error",
    },
  },
  variants: {
    type: {
      radio: {
        item: {
          alignItems: "center",
          "&:hover [data-choice-control]:not([data-state=checked])": {
            borderColor: "ds.gray.900",
          },
        },
        control: {
          borderRadius: "9999px",
          transition: "border-color 0.2s ease-in, background 0.2s ease-in",
          _after: {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "8px",
            height: "8px",
            borderRadius: "9999px",
            backgroundColor: "ds.gray.1000",
            transform: "translate(-50%, -50%) scale(0)",
            transition: "transform 0.15s ease-in",
          },
          "&[data-state=checked]": {
            _after: { transform: "translate(-50%, -50%) scale(1)" },
          },
        },
      },
      checkbox: {
        item: { alignItems: "flex-start" },
        control: {
          // Centres the 16px box on the first 19.5px text line.
          marginTop: "1.75px",
          borderRadius: "4px",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&[data-state=checked]": { backgroundColor: "ds.gray.1000" },
        },
        indicator: {
          width: "16px",
          height: "16px",
          flexShrink: 0,
          color: "ds.background.100",
          visibility: "hidden",
          "[data-state=checked] > &": { visibility: "visible" },
        },
      },
    },
    layout: {
      row: { group: { flexDirection: "row", gap: "24px" } },
      wrap: { group: { flexWrap: "wrap", columnGap: "24px", rowGap: "16px" } },
      column: { group: { flexDirection: "column", gap: "8px" } },
    },
    padded: { true: { root: { paddingBottom: "12px" } } },
  },
  defaultVariants: { type: "radio", layout: "row" },
});
