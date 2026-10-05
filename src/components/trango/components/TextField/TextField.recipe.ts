import { defineSlotRecipe } from "@chakra-ui/react";

export const textFieldSlotRecipe = defineSlotRecipe({
  className: "text-field",
  slots: ["root", "label", "control", "addon", "input", "helperText", "errorText"],
  base: {
    root: { display: "block", width: "100%", minWidth: 0 },
    label: {
      display: "block",
      maxWidth: "100%",
      marginBottom: "8px",
      fontSize: "13px",
      lineHeight: "19.5px",
      color: "ds.gray.900",
      textTransform: "capitalize",
      cursor: "text",
    },
    control: {
      display: "flex",
      maxWidth: "100%",
      height: "36px",
      overflow: "hidden",
      fontSize: "14px",
      lineHeight: "20px",
      borderRadius: "6px",
      boxShadow: "0 0 0 1px {colors.ds.grayAlpha.400}",
      transition: "box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: { boxShadow: "0 0 0 1px {colors.ds.grayAlpha.500}" },
      // Outranks hover; focus keeps its own ring.
      "&[data-invalid]:not(:focus-within)": { boxShadow: "0 0 0 1px {colors.ds.error}" },
      // !important so focus beats hover while the pointer is still over the field.
      _focusWithin: {
        boxShadow:
          "0 0 0 1px {colors.ds.grayAlpha.600}, 0 0 0 4px {colors.ds.inputRing} !important",
      },
    },
    addon: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
      paddingInline: "12px",
      whiteSpace: "nowrap",
      color: "ds.gray.700",
      backgroundColor: "ds.background.200",
      borderRight: "1px solid {colors.ds.grayAlpha.400}",
    },
    input: {
      flex: "1 1 0%",
      width: "100%",
      minWidth: 0,
      height: "36px",
      paddingInline: "12px",
      fontSize: "14px",
      lineHeight: "20px",
      color: "ds.foreground",
      backgroundColor: "ds.background.100",
      border: "none",
      outline: "none",
      appearance: "none",
      _placeholder: { color: "ds.gray.700" },
    },
    errorText: {
      display: "block",
      marginTop: "8px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.error",
    },
    helperText: {
      display: "block",
      marginTop: "8px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.gray.900",
    },
  },
});
