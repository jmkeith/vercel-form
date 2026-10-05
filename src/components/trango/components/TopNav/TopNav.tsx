"use client";

import { createSlotRecipeContext, type HTMLChakraProps } from "@chakra-ui/react";
import { topNavSlotRecipe, type TopNavVariantProps } from "./TopNav.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: topNavSlotRecipe });

export interface TopNavRootProps extends HTMLChakraProps<"header">, TopNavVariantProps {}

/** The site header. Resolves the recipe (`hasLocalNavigation`) and shares it with every part. */
export const TopNavRoot = withProvider<HTMLElement, TopNavRootProps>("header", "root");

/** Content above the bar, e.g. an announcement banner. */
export type TopNavAboveProps = HTMLChakraProps<"div">;
export const TopNavAbove = withContext<HTMLDivElement, TopNavAboveProps>("div", "above");

/** The main row, holding `Left`, `Center` and `Right`. */
export type TopNavBarProps = HTMLChakraProps<"div">;
export const TopNavBar = withContext<HTMLDivElement, TopNavBarProps>("div", "bar");

export type TopNavLeftProps = HTMLChakraProps<"div">;
export const TopNavLeft = withContext<HTMLDivElement, TopNavLeftProps>("div", "left");

/** Takes the free space; its content moves to the end below `lg`. */
export type TopNavCenterProps = HTMLChakraProps<"div">;
export const TopNavCenter = withContext<HTMLDivElement, TopNavCenterProps>("div", "center");

export type TopNavRightProps = HTMLChakraProps<"div">;
export const TopNavRight = withContext<HTMLDivElement, TopNavRightProps>("div", "right");

/** Local navigation under the bar. Set `hasLocalNavigation` on the root with it. */
export type TopNavLocalProps = HTMLChakraProps<"div">;
export const TopNavLocal = withContext<HTMLDivElement, TopNavLocalProps>("div", "local");
