"use client";

import { createSlotRecipeContext, mergeRefs, type HTMLChakraProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import { pageLayoutSlotRecipe, type PageLayoutVariantProps } from "./PageLayout.recipe";
import { usePaneResize } from "./usePaneResize";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: pageLayoutSlotRecipe });

// `padding`, `rowGap` and `columnGap` are layout variants here, not style props.
export interface PageLayoutRootProps
  extends Omit<HTMLChakraProps<"div">, keyof PageLayoutVariantProps>, PageLayoutVariantProps {}

/**
 * Resolves the recipe and shares its styles with every part. All layout options are variants of
 * the root. Set `--page-layout-sticky-offset` (through `css`) to keep a sticky pane below a
 * fixed site header.
 */
export const PageLayoutRoot = withProvider<HTMLDivElement, PageLayoutRootProps>("div", "root");

// Parts are placed by grid area, in any DOM order. Hide one per viewport with `hideBelow` /
// `hideFrom`.
export type PageLayoutHeaderProps = HTMLChakraProps<"header">;
export const PageLayoutHeader = withContext<HTMLElement, PageLayoutHeaderProps>(
  "header",
  "header",
);

/** Renders a `main`; pass `as="div"` when the page already has one. */
export type PageLayoutContentProps = HTMLChakraProps<"main">;
export const PageLayoutContent = withContext<HTMLElement, PageLayoutContentProps>(
  "main",
  "content",
);

/** Full-height column outside header, content, pane and footer. */
export type PageLayoutSidebarProps = HTMLChakraProps<"aside">;
export const PageLayoutSidebar = withContext<HTMLElement, PageLayoutSidebarProps>(
  "aside",
  "sidebar",
);

export type PageLayoutFooterProps = HTMLChakraProps<"footer">;
export const PageLayoutFooter = withContext<HTMLElement, PageLayoutFooterProps>(
  "footer",
  "footer",
);

const PaneAside = withContext<HTMLElement, HTMLChakraProps<"aside">>("aside", "pane");

export type PageLayoutResizeHandleProps = HTMLChakraProps<"div">;
const PaneResizeHandle = withContext<HTMLDivElement, PageLayoutResizeHandleProps>(
  "div",
  "resizeHandle",
  {
    defaultProps: {
      role: "separator",
      tabIndex: 0,
      "aria-orientation": "vertical",
      "aria-label": "Resize pane",
    },
  },
);

export interface PageLayoutPaneProps extends HTMLChakraProps<"aside"> {
  /**
   * Adds a handle on the pane's divider to resize it by dragging or with the arrow keys.
   * The width stays between the pane's `minWidth` and `maxWidth` style props.
   */
  resizable?: boolean;
  /** localStorage key to remember the resized width under. */
  widthStorageKey?: string;
}

/** Secondary column next to the content. Give it an `aria-label`. */
export const PageLayoutPane = forwardRef<HTMLElement, PageLayoutPaneProps>(
  function PageLayoutPane({ resizable = false, widthStorageKey, ...props }, ref) {
    const { paneRef, handleProps } = usePaneResize({
      enabled: resizable,
      storageKey: widthStorageKey,
    });
    return (
      <>
        <PaneAside
          ref={mergeRefs(paneRef, ref)}
          data-resizable={resizable ? "" : undefined}
          {...props}
        />
        {resizable && (
          <PaneResizeHandle hideBelow={props.hideBelow} hideFrom={props.hideFrom} {...handleProps} />
        )}
      </>
    );
  },
);
