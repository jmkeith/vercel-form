"use client";

import { createSlotRecipeContext, useSlotRecipe, chakra } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { formSlotRecipe, type FormVariantProps } from "./Form.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: formSlotRecipe });

export type FormRootProps = React.ComponentProps<"form"> & Pick<FormVariantProps, "chrome">;

/** The bordered card; also the `<form>` element. */
export const FormRoot = withProvider<HTMLFormElement, FormRootProps>("form", "root");
export const FormGrid = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "grid");
export const FormStack = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "stack");
export const FormProse = withContext<HTMLDivElement, React.ComponentProps<"div">>("div", "prose");
export const FormDivider = withContext<HTMLDivElement, React.ComponentProps<"div">>(
  "div",
  "divider",
);
export const FormNote = withContext<HTMLParagraphElement, React.ComponentProps<"p">>("p", "note");
export const FormFooter = withContext<HTMLDivElement, React.ComponentProps<"div">>(
  "div",
  "footer",
);
export const FormStatus = withContext<HTMLParagraphElement, React.ComponentProps<"p">>(
  "p",
  "status",
);
export const FormSubmit = withContext<HTMLButtonElement, React.ComponentProps<"button">>(
  "button",
  "submit",
);

export interface FormCellProps {
  span?: "half" | "full";
  children: ReactNode;
}

/** Grid cell for one field; `span="full"` stretches across both columns. */
export function FormCell({ span = "half", children }: FormCellProps) {
  const recipe = useSlotRecipe({ recipe: formSlotRecipe });
  const styles = recipe({ span });

  return <chakra.div css={styles.cell}>{children}</chakra.div>;
}
