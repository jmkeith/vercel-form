"use client";

import { chakra, Field, Input, useSlotRecipe, type InputProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { textFieldSlotRecipe } from "./TextField.recipe";

export interface TextFieldProps {
  /** Submitted form key. */
  name: string;
  label: ReactNode;
  type?: "text" | "email" | "url";
  placeholder?: string;
  /** Static text shown in an addon before the input, e.g. "github.com/". */
  prefix?: string;
  helperText?: ReactNode;
  ariaLabel?: string;
  autoComplete?: string;
  maxLength?: number;
  required?: boolean;
  invalid?: boolean;
  errorText?: ReactNode;
  /** Extra props for the `<input>`, e.g. a form library's value, handlers and ref. */
  inputProps?: InputProps & { ref?: React.Ref<HTMLInputElement> };
}

export function TextField({
  name,
  label,
  type = "text",
  placeholder,
  prefix,
  helperText,
  ariaLabel,
  autoComplete,
  maxLength,
  required,
  invalid,
  errorText,
  inputProps,
}: TextFieldProps) {
  const recipe = useSlotRecipe({ recipe: textFieldSlotRecipe });
  const styles = recipe();

  return (
    <Field.Root unstyled css={styles.root} required={required} invalid={invalid}>
      <Field.Label css={styles.label}>{label}</Field.Label>
      <chakra.div css={styles.control} data-invalid={invalid ? "" : undefined}>
        {prefix ? (
          <chakra.span css={styles.addon} aria-hidden="true">
            {prefix}
          </chakra.span>
        ) : null}
        <Input
          unstyled
          css={styles.input}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          maxLength={maxLength}
          {...inputProps}
        />
      </chakra.div>
      {helperText ? (
        <Field.HelperText css={styles.helperText}>{helperText}</Field.HelperText>
      ) : null}
      <Field.ErrorText css={styles.errorText}>{errorText}</Field.ErrorText>
    </Field.Root>
  );
}
