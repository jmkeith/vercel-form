import { defineSlotRecipe } from "@chakra-ui/react";

export const fileFieldSlotRecipe = defineSlotRecipe({
  className: "file-field",
  slots: ["root", "label", "row", "trigger", "triggerContent", "helperText", "errorText"],
  base: {
    root: { display: "block", width: "100%", minWidth: 0 },
    label: {
      display: "inline-block",
      marginBottom: "8px",
      fontSize: "13px",
      lineHeight: "19.5px",
      color: "ds.gray.900",
    },
    row: {
      display: "flex",
      flexDirection: { base: "column", md: "row" },
      alignItems: { md: "center" },
      gap: { base: "8px", md: "24px" },
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: { md: "305px" },
      height: "36px",
      padding: "0 10px 0 6px",
      fontSize: "14px",
      lineHeight: "21px",
      textAlign: "left",
      color: "ds.gray.900",
      backgroundColor: "ds.background.100",
      border: "1px dashed {colors.ds.grayAlpha.600}",
      borderRadius: "6px",
      cursor: "pointer",
      outline: "none",
      transition:
        "background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: {
        color: "ds.gray.1000",
        backgroundColor: { base: "ds.gray.100", _dark: "ds.gray.200" },
      },
      _focusVisible: { boxShadow: "focusRing" },
      "&[data-invalid]": { borderColor: "ds.error" },
    },
    triggerContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: 0,
      marginRight: "auto",
      paddingInline: "6px",
      "& > span": { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
    },
    errorText: {
      display: "block",
      marginTop: "8px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.error",
    },
    helperText: { fontSize: "13px", lineHeight: "18px", color: "ds.gray.900" },
  },
});
