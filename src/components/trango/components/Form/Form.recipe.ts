import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react";

const bleed = "calc(var(--form-padding) * -1)";

export const formSlotRecipe = defineSlotRecipe({
  className: "form-layout",
  slots: [
    "root",
    "grid",
    "cell",
    "stack",
    "prose",
    "divider",
    "note",
    "footer",
    "status",
    "submit",
  ],
  base: {
    root: {
      "--form-padding": { base: "24px", md: "40px", lg: "48px" },
      width: "100%",
      padding: "var(--form-padding)",
      color: "ds.gray.1000",
      backgroundColor: "ds.background.100",
      boxShadow: { base: "none", md: "0 0 0 1px {colors.ds.gray.200}" },
    },
    grid: {
      display: { base: "flex", md: "grid" },
      flexDirection: "column",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      rowGap: "32px",
      columnGap: "24px",
    },
    cell: { minWidth: 0 },
    stack: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      marginTop: "32px",
    },
    prose: {
      fontSize: "14px",
      lineHeight: "20px",
      color: "ds.gray.900",
      "& p + p": { marginTop: "20px" },
      "& strong": { fontWeight: 500, color: "ds.gray.1000" },
      "& u": { textDecoration: "underline" },
      "& a": { color: "ds.link", textDecoration: "none" },
    },
    divider: {
      marginInline: bleed,
      paddingTop: { base: "36px", md: "60px" },
      borderBottom: "1px dashed {colors.ds.grayAlpha.400}",
    },
    note: {
      paddingTop: { base: "4px", md: "48px" },
      marginBottom: "36px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.gray.900",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "16px",
      marginTop: "48px",
      marginInline: bleed,
      marginBottom: bleed,
      padding: "24px",
      borderTop: "1px solid {colors.ds.grayAlpha.200}",
    },
    status: {
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.gray.900",
      "&[data-status=error]": { color: "ds.error" },
    },
    submit: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      height: "36px",
      paddingInline: "12px",
      fontSize: "14px",
      lineHeight: "21px",
      fontWeight: 500,
      whiteSpace: "nowrap",
      color: "ds.background.100",
      backgroundColor: "ds.gray.1000",
      borderRadius: "9999px",
      cursor: "pointer",
      outline: "none",
      transition: "background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      "& > span": { paddingInline: "6px" },
      _hover: { backgroundColor: "ds.primaryHover" },
      _focusVisible: { boxShadow: "focusRing" },
      _disabled: { opacity: 0.6, cursor: "not-allowed" },
    },
  },
  variants: {
    span: {
      half: {},
      full: { cell: { gridColumn: "span 2 / span 2" } },
    },
    chrome: {
      // Free-standing card with its own outline.
      card: {},
      // No outline, for forms placed inside an already framed area.
      plain: { root: { boxShadow: "none" } },
    },
  },
  defaultVariants: { span: "half", chrome: "card" },
});

export type FormVariantProps = RecipeVariantProps<typeof formSlotRecipe>;
