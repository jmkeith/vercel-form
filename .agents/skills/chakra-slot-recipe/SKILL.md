---
name: chakra-slot-recipe
description: >
  Create a new multi-part component, or convert existing HTML/CSS, Tailwind,
  CSS Modules, styled-components, shadcn, or plain React/Chakra JSX, into a
  Chakra UI v3 slot recipe component: a ComponentName/ folder holding the slot
  recipe (defineSlotRecipe), the compound parts (createSlotRecipeContext), and
  an index. Use this skill whenever the user wants a reusable Chakra component
  with parts and variants, asks to "make this a slot recipe", "turn this markup
  into a Chakra component", "convert this card/navbar/pricing table/hero to
  Chakra", "componentize this section", "add variants/sizes to this component",
  or pastes markup and wants a themeable Chakra v3 component out of it — even
  if they never say "slot recipe". Prefer this over a generic Chakra build or
  refactor whenever the result should be a reusable component with more than
  one styled part.
compatibility: Requires the Chakra UI MCP server (@chakra-ui/react-mcp) and @chakra-ui/react v3.
---

# Chakra UI v3 slot recipe components

Turn a description or an existing piece of UI (HTML, another styling system, or
loose Chakra JSX) into a slot recipe component: styles for every part live in
one recipe, and the parts are thin compound components that read those styles
from context. The payoff is that variants are declared once and every part
responds to them, and consumers restyle through the theme instead of forking
JSX.

## Step 1 — Look things up in the Chakra UI MCP server first

Chakra v3 renamed and restructured a great deal, and remembered v2 habits
(`colorScheme`, `isDisabled`, `icon=` on `IconButton`, `fg.default`,
`container.lg`) look plausible and are wrong. So treat the Chakra UI MCP server
as the source of truth for every component, prop, and token you use, rather
than memory:

| Question                                    | MCP tool                |
| ------------------------------------------- | ----------------------- |
| Does a component exist / what is it called? | `list_components`       |
| Which props, variants, sizes does it take?  | `get_component_props`   |
| How is it composed (its parts, in order)?   | `get_component_example` |
| Which tokens exist (colors, radii, sizes)?  | `get_theme`             |
| How do I add tokens the design needs?       | `customize_theme`       |
| Did any v2 API slip into my output?         | `v2_to_v3_code_review`  |

Look up each Chakra component before you use it, check token names against
`get_theme`, and run `v2_to_v3_code_review` on the finished files. If the MCP
tools are not available, say so, and fall back to the installed types under
`node_modules/@chakra-ui/react/dist/types/` — do not fill the gap from memory.

Also read the project before writing: `package.json` (Chakra version,
framework), where the Chakra `system` is created, and where components live, so
the new folder matches local conventions (quotes, semicolons, import aliases).

## Step 2 — Find the slots, variants, and states

Read the source (or the request) and separate three things:

- **Slots** — every element that carries its own styling becomes a named part:
  `root` plus things like `header`, `title`, `media`, `body`, `footer`,
  `indicator`. Name by role, not by look. A wrapper that exists only to lay out
  its children usually does not need a slot; fold its layout into the parent
  part or flatten it away.
- **Variants** — anything that changes appearance by a switch becomes a variant
  key: BEM modifiers (`card--outlined`), conditional class strings, Tailwind
  `cva` variants, boolean props, size props. Typical keys are `variant` and
  `size`; add others when the source has them. Values shared by all variants
  go in `base`.
- **States** — `:hover`, `:focus-visible`, `[disabled]`, `[aria-expanded]`,
  `data-*` selectors become condition keys (`_hover`, `_focusVisible`,
  `_disabled`, `_expanded`, `_open`) inside the slot's styles. Media queries
  become responsive objects.

When converting, carry over every declaration — a conversion that silently
drops a hover state or a breakpoint is a regression the user will only find
later. When something has no clean equivalent, keep it in the slot's `css`-style
object (nested selectors are allowed there) rather than dropping it.

## Step 3 — Write the three files

```
ComponentName/
  index.ts                  # public exports + the ComponentName.Part namespace
  ComponentName.recipe.ts   # defineSlotRecipe + variant prop type
  ComponentName.tsx         # the parts, built with createSlotRecipeContext
```

A complete, compiled example lives in `assets/FeatureCard/`. Read all three
files before writing your own — they are short, and they are the template.
The shape of each:

**`ComponentName.recipe.ts`** — styles only, no React.

```ts
import { defineSlotRecipe, type RecipeVariantProps } from "@chakra-ui/react"

export const featureCardSlotRecipe = defineSlotRecipe({
  className: "feature-card", // parts render as .feature-card__root etc.
  slots: ["root", "media", "body", "title", "description", "footer"],
  base: {
    root: { display: "flex", flexDirection: "column", bg: "bg.panel", rounded: "lg" },
    title: { textStyle: "lg", fontWeight: "semibold" },
    // one entry per slot that has styles
  },
  variants: {
    size: {
      sm: { body: { p: "4" } },
      md: { body: { p: { base: "4", md: "6" } } },
    },
  },
  defaultVariants: { size: "md" },
})

export type FeatureCardVariantProps = RecipeVariantProps<typeof featureCardSlotRecipe>
```

**`ComponentName.tsx`** — one component per slot. `withProvider` creates the
root (it resolves the recipe and takes the variant props); `withContext`
creates each child part. The first type argument is the DOM element type, the
second the props.

```tsx
"use client"

import { createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react"
import { featureCardSlotRecipe, type FeatureCardVariantProps } from "./FeatureCard.recipe"

const { withProvider, withContext } = createSlotRecipeContext({
  recipe: featureCardSlotRecipe,
})

export interface FeatureCardRootProps
  extends HTMLChakraProps<"article">,
    FeatureCardVariantProps {}

export const FeatureCardRoot = withProvider<HTMLElement, FeatureCardRootProps>("article", "root")

export type FeatureCardTitleProps = HTMLChakraProps<"h3">

export const FeatureCardTitle = withContext<HTMLHeadingElement, FeatureCardTitleProps>("h3", "title")
```

**`index.ts`** — re-export everything, and build the dotted namespace here so
it works from both Server and Client Components.

```ts
import { FeatureCardRoot, FeatureCardTitle } from "./FeatureCard"

export const FeatureCard = {
  Root: FeatureCardRoot,
  Title: FeatureCardTitle,
}

export * from "./FeatureCard"
export * from "./FeatureCard.recipe"
```

Things that are easy to get wrong:

- `createSlotRecipeContext` uses React context, so `ComponentName.tsx` needs
  `"use client"`. The recipe file and `index.ts` do not, and the namespace
  object belongs in `index.ts` — a Server Component cannot read `.Root` off an
  object exported from a `"use client"` file.
- Passing `recipe:` keeps the component self-contained: no theme edit needed.
  If the user wants it overridable from the theme, also register it under
  `theme.slotRecipes` in their `defineConfig`, switch the context to
  `createSlotRecipeContext({ key: "featureCard" })`, and run
  `npx @chakra-ui/cli typegen <path-to-theme>` so the variant types exist.
- Every name in `slots` should be used by a part, and every part should name a
  slot that exists — a typo fails silently as an unstyled element.
- Choose variant keys that are not HTML attributes. A variant called
  `orientation`, for example, is also forwarded to the DOM element as an attribute; a
  name like `layout` avoids that.
- Use `colorPalette.*` tokens (`colorPalette.solid`, `colorPalette.contrast`,
  `colorPalette.fg`) for accent colors so consumers can write
  `colorPalette="blue"` on the root.
- Pick the element by meaning: `article`/`section`/`nav`/`header`/`footer`,
  `h2`–`h6` for titles, `p` for copy, `button` or `a` for anything clickable,
  `ul`/`li` for lists.

## Step 4 — Reach for the right Chakra primitive

Layout that is intrinsic to the component belongs in the recipe (`display`,
`gap`, `gridTemplateColumns` on the slot), which is why most parts are plain
elements. Chakra components come in at three points: as the base of a part
that needs real behavior (`withContext(Button, "action")` — look up the
component in the MCP server first), inside a convenience wrapper that composes
the parts, and in the usage example. There, pick the narrowest primitive that
fits rather than wrapping everything in `Box`:

| Need                     | Use                                     |
| ------------------------ | --------------------------------------- |
| Vertical stack of items  | `Stack` (default) or `VStack`           |
| Horizontal row           | `HStack` or `Flex`                      |
| CSS Grid                 | `Grid` + `GridItem`                     |
| Equal-column grid        | `SimpleGrid columns={N}`                |
| Centered page content    | `Container` with a `maxW` size token    |
| Full flexbox control     | `Flex` with explicit props              |
| Semantic section/article | `Box as="section"` / `Box as="article"` |

Avoid deep nesting: three wrappers deep with no semantic reason means flatten
it. Prefer `gap` over margins between siblings — margins leak into whatever the
part is placed next to.

When the source contains something Chakra already ships (dialog, menu, tabs,
accordion, tooltip, select, avatar, badge…), use the Chakra component for that
piece instead of re-implementing it as slots; its keyboard and ARIA behavior is
the hard part. `references/component-decision-tree.md` covers which component
to choose when it is not obvious — read it when you are unsure.

## Step 5 — Use tokens, not raw values

Semantic tokens adapt to light/dark mode for free, so prefer them in the
recipe:

```ts
root: { bg: "bg.subtle", color: "fg", borderColor: "border.subtle", shadow: "md", rounded: "lg" },
description: { color: "fg.muted" },
```

The default semantic color names are `bg`, `bg.subtle`, `bg.muted`,
`bg.emphasized`, `bg.panel`, `bg.inverted`; `fg`, `fg.muted`, `fg.subtle`,
`fg.inverted`; `border`, `border.muted`, `border.subtle`, `border.emphasized`
— plus `.error/.warning/.success/.info` on each. Confirm against `get_theme`,
since the project may have changed them. Use raw palette values (`blue.500`)
only when a color is meant not to shift with color mode.

When converting, map a source value to a token only when it actually matches
(`16px` → `4`, `0.5rem` radius → `lg`). If nothing matches and the user wants
visual fidelity, keep the exact value (`p: "18px"`, `bg: "#0a0a0a"`) or propose
a new token via `customize_theme` — rounding to the nearest token quietly
changes the design.

## Step 6 — Responsive styles

Breakpoints are mobile-first. Use object syntax in recipes so each value is
labelled:

```ts
root: { flexDirection: { base: "column", md: "row" } },
body: { p: { base: "4", md: "6" } },
```

Handle at least `base` and `md` for anything that affects layout, unless the
request is explicitly single-viewport. Convert `@media (min-width: …)` rules to
the nearest breakpoint from `get_theme`; for `max-width` queries, invert them
into a mobile-first pair.

## Step 7 — Forms and accessibility

Wrap every form control in `Field.Root` so label, help text, error text, and
required state are wired together (confirm the current API with
`get_component_example` for `field`):

```tsx
<Field.Root invalid={!!error} required>
  <Field.Label>Email address</Field.Label>
  <Input type="email" placeholder="you@example.com" />
  <Field.HelpText>We'll never share your email.</Field.HelpText>
  <Field.ErrorText>{error}</Field.ErrorText>
</Field.Root>
```

Use `disabled`, not `isDisabled`. Chakra components handle most accessibility
themselves — don't override it. What you still provide:

- Icon-only buttons need an `aria-label`; in v3 the icon is the child:
  `<IconButton aria-label="Close dialog"><LuX /></IconButton>`.
- Images need meaningful `alt` (or `alt=""` when decorative).
- A clickable part is a `button` or `a`, never a `div` with `onClick`.
- Keep heading levels in order; let the consumer change a title's level with
  `as`.
- Keep focus styles: if the source had `:focus-visible` rules, port them; if it
  had none, add `_focusVisible` on interactive slots.

## Output

1. The three files, complete and runnable — real imports, no `TODO` or elided
   sections. Group Chakra imports first, then local ones.
2. A short usage example showing the parts composed, with at least one
   non-default variant.
3. Two to four sentences on the decisions that matter: the slots and variants
   you chose, anything from the source you changed or could not carry over, and
   any token you had to approximate. Skip this for trivial requests.

If a piece is big enough to contain a clearly separable sub-component (a
pricing table and its plan card), give each its own folder with the same three
files rather than one giant slot list.

Before finishing, typecheck what you wrote (`npx tsc --noEmit`, or the project's
own check script) and fix anything in your files.
