import { buttonRecipe } from "./button.recipe";
import { heroRecipe } from "./hero.recipe";
import { siteContentRecipe } from "./site-content.recipe";
import { siteFooterRecipe } from "./site-footer.recipe";
import { siteHeaderRecipe } from "./site-header.recipe";
import { siteLayoutRecipe } from "./site-layout.recipe";

/** Single-part recipes, keyed as registered in the theme. */
export const recipes = {
  vercelButton: buttonRecipe,
};

/** Slot recipes, keyed as registered in the theme. */
export const slotRecipes = {
  siteLayout: siteLayoutRecipe,
  siteHeader: siteHeaderRecipe,
  siteFooter: siteFooterRecipe,
  hero: heroRecipe,
  siteContent: siteContentRecipe,
};

export {
  buttonRecipe,
  heroRecipe,
  siteContentRecipe,
  siteFooterRecipe,
  siteHeaderRecipe,
  siteLayoutRecipe,
};
