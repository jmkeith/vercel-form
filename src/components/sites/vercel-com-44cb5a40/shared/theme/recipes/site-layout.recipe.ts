import { defineSlotRecipe } from "@chakra-ui/react";

export const siteLayoutRecipe = defineSlotRecipe({
  className: "vc-site-layout",
  slots: ["root", "main", "band", "bandCell"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
      minWidth: 0,
      backgroundColor: "ds.page",
    },
    // Framed content column: bordered, centred, with a rule between its sections.
    main: {
      width: "100%",
      maxWidth: "{sizes.content}",
      marginInline: "auto",
      borderTop: "1px solid {colors.ds.gray.400}",
      borderInline: { base: "0", sm: "1px solid {colors.ds.gray.400}" },
      "& > :not(:last-child)": { borderBottom: "1px solid {colors.ds.gray.400}" },
    },
    // Decorative row of twelve square cells.
    band: {
      display: "grid",
      gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    },
    bandCell: {
      gridColumn: "span 1 / span 1",
      aspectRatio: "1 / 1",
      "&:not(:last-child)": { borderRight: "1px solid {colors.ds.gray.400}" },
    },
  },
});
