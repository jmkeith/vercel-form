import { defineSlotRecipe } from "@chakra-ui/react";

export const heroRecipe = defineSlotRecipe({
  className: "vc-hero",
  slots: ["root", "gutter", "content", "mark", "title", "description"],
  base: {
    root: {
      display: "grid",
      gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
      "& > :not(:last-child)": { borderRight: "1px solid {colors.ds.gray.400}" },
    },
    gutter: { gridColumn: "span 1 / span 1" },
    content: {
      gridColumn: "span 10 / span 10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      paddingInline: "32px",
      paddingBlock: { base: "64px", sm: "96px" },
    },
    mark: { display: "block", width: "40px", height: "40px", color: "ds.gray.1000" },
    title: {
      marginTop: "32px",
      marginBottom: "16px",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      color: "ds.gray.1000",
      fontSize: { base: "30px", sm: "36px", md: "48px", lg: "60px" },
      lineHeight: { base: "36px", sm: "40px", md: "48px", lg: "60px" },
    },
    description: {
      width: "100%",
      maxWidth: "512px",
      textWrap: "pretty",
      color: "ds.gray.700",
      fontSize: { base: "16px", sm: "18px", md: "20px" },
      lineHeight: { base: "24px", sm: "28px" },
    },
  },
});
