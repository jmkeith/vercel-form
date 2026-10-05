"use client";

import { createSlotRecipeContext } from "@chakra-ui/react";
import { LogoMarkIcon } from "./icons";
import { heroRecipe } from "./theme/recipes/hero.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: heroRecipe });

const HeroRoot = withProvider<HTMLDivElement, React.ComponentProps<"div">>("div", "root");
const HeroGutter = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "gutter");
const HeroContent = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "content");
const HeroMark = withContext<SVGSVGElement, React.ComponentProps<"svg">>(LogoMarkIcon, "mark");
const HeroTitle = withContext<HTMLHeadingElement, React.ComponentProps<"h1">>("h1", "title");
const HeroDescription = withContext<HTMLParagraphElement, React.ComponentProps<"p">>(
  "p",
  "description",
);

interface HeroProps {
  title: string;
  description: string;
}

export function Hero({ title, description }: HeroProps) {
  return (
    <HeroRoot>
      <HeroGutter />
      <HeroContent>
        <HeroMark />
        <HeroTitle>{title}</HeroTitle>
        <HeroDescription>{description}</HeroDescription>
      </HeroContent>
      <HeroGutter />
    </HeroRoot>
  );
}
