"use client"

import {
  createSlotRecipeContext,
  type HTMLChakraProps,
} from "@chakra-ui/react"
import {
  featureCardSlotRecipe,
  type FeatureCardVariantProps,
} from "./FeatureCard.recipe"

const { withProvider, withContext } = createSlotRecipeContext({
  recipe: featureCardSlotRecipe,
})

export interface FeatureCardRootProps
  extends HTMLChakraProps<"article">,
    FeatureCardVariantProps {}

export const FeatureCardRoot = withProvider<HTMLElement, FeatureCardRootProps>(
  "article",
  "root",
)

export type FeatureCardMediaProps = HTMLChakraProps<"img">

export const FeatureCardMedia = withContext<
  HTMLImageElement,
  FeatureCardMediaProps
>("img", "media")

export type FeatureCardBodyProps = HTMLChakraProps<"div">

export const FeatureCardBody = withContext<
  HTMLDivElement,
  FeatureCardBodyProps
>("div", "body")

export type FeatureCardTitleProps = HTMLChakraProps<"h3">

export const FeatureCardTitle = withContext<
  HTMLHeadingElement,
  FeatureCardTitleProps
>("h3", "title")

export type FeatureCardDescriptionProps = HTMLChakraProps<"p">

export const FeatureCardDescription = withContext<
  HTMLParagraphElement,
  FeatureCardDescriptionProps
>("p", "description")

export type FeatureCardFooterProps = HTMLChakraProps<"footer">

export const FeatureCardFooter = withContext<
  HTMLElement,
  FeatureCardFooterProps
>("footer", "footer")
