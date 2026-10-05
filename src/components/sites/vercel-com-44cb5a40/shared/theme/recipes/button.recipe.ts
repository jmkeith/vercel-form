import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  className: "vc-button",
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    fontWeight: 500,
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    textDecoration: "none",
    outline: "none",
    transition:
      "background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    _focusVisible: { boxShadow: "focusRing" },
    "& > span": {
      display: "inline-block",
      paddingInline: "6px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  variants: {
    variant: {
      primary: {
        color: "ds.background.100",
        backgroundColor: "ds.gray.1000",
        _hover: { backgroundColor: "ds.primaryHover" },
      },
      secondary: {
        color: "ds.gray.1000",
        backgroundColor: "ds.background.100",
        boxShadow: "0 0 0 1px {colors.ds.gray.400}",
        _hover: { backgroundColor: "ds.gray.100" },
      },
    },
    size: {
      sm: {
        height: "32px",
        paddingInline: "6px",
        fontSize: "14px",
        lineHeight: "21px",
        borderRadius: "4px",
      },
      lg: {
        width: "100%",
        height: "40px",
        paddingInline: "14px",
        fontSize: "16px",
        lineHeight: "24px",
        borderRadius: "8px",
      },
    },
  },
  defaultVariants: { variant: "secondary", size: "sm" },
});
