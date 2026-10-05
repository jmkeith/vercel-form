import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react"

export const featureCardSlotRecipe = defineSlotRecipe({
  className: "feature-card",
  slots: ["root", "media", "body", "title", "description", "footer"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      bg: "bg.panel",
      color: "fg",
      borderWidth: "1px",
      borderColor: "border",
      rounded: "lg",
      transition: "box-shadow 0.2s ease",
      _hover: { shadow: "md" },
    },
    media: {
      aspectRatio: "16 / 9",
      objectFit: "cover",
      width: "full",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      gap: "2",
      flex: "1",
    },
    title: {
      textStyle: "lg",
      fontWeight: "semibold",
    },
    description: {
      textStyle: "sm",
      color: "fg.muted",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      gap: "3",
      borderTopWidth: "1px",
      borderColor: "border.muted",
    },
  },
  variants: {
    variant: {
      outline: {},
      elevated: {
        root: { borderWidth: "0", shadow: "sm" },
      },
      solid: {
        root: {
          bg: "colorPalette.solid",
          color: "colorPalette.contrast",
          borderColor: "transparent",
        },
        description: { color: "inherit", opacity: 0.8 },
      },
    },
    size: {
      sm: {
        body: { p: "4" },
        footer: { px: "4", py: "3" },
      },
      md: {
        body: { p: { base: "4", md: "6" } },
        footer: { px: { base: "4", md: "6" }, py: "4" },
      },
    },
    layout: {
      vertical: {},
      horizontal: {
        root: { flexDirection: { base: "column", md: "row" } },
        media: { width: { base: "full", md: "40%" }, aspectRatio: "auto" },
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    layout: "vertical",
  },
})

export type FeatureCardVariantProps = RecipeVariantProps<
  typeof featureCardSlotRecipe
>
