"use client";

import { createSlotRecipeContext } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { siteLayoutRecipe } from "./theme/recipes/site-layout.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: siteLayoutRecipe });

const SiteLayoutRoot = withProvider<HTMLDivElement, React.ComponentProps<"div">>("div", "root");
const Band = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "band");
const BandCell = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "bandCell");

const BAND_CELLS = Array.from({ length: 12 }, (_, index) => index);

/** Site-wide chrome: page background, header and footer around the route's content. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteLayoutRoot>
      <SiteHeader />
      {children}
      <SiteFooter />
    </SiteLayoutRoot>
  );
}

/** Framed content column; its direct children are separated by rules. */
export const SiteMain = withContext<HTMLElement, React.ComponentProps<"main">>("main", "main");

/** Decorative grid row, used above and below the hero. */
export function GridBand() {
  return (
    <Band aria-hidden="true">
      {BAND_CELLS.map((cell) => (
        <BandCell key={cell} />
      ))}
    </Band>
  );
}
