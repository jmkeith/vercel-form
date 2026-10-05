"use client";

import {
  chakra,
  Checkbox,
  CheckboxGroup,
  Fieldset,
  RadioGroup,
  useSlotRecipe,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { choiceFieldSlotRecipe } from "./ChoiceField.recipe";

export interface ChoiceOption {
  label: string;
  value: string;
}

interface ChoiceFieldBaseProps {
  /** Submitted form key. */
  name: string;
  legend: ReactNode;
  options: ChoiceOption[];
  /** "row": one line; "wrap": wrapping row; "column": one option per line. */
  layout?: "row" | "wrap" | "column";
  /** Adds the extra space the grid questions have below their options. */
  padded?: boolean;
  required?: boolean;
  invalid?: boolean;
  errorText?: ReactNode;
}

export interface RadioChoiceFieldProps extends ChoiceFieldBaseProps {
  /** Picks one option. */
  kind: "radio";
  /** Controlled value; "" means nothing is picked. Needs `onValueChange`. */
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface CheckboxChoiceFieldProps extends ChoiceFieldBaseProps {
  /** Picks any number of options. */
  kind: "checkbox";
  /** Controlled values. Needs `onValueChange`. */
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ChoiceFieldProps = RadioChoiceFieldProps | CheckboxChoiceFieldProps;

function CheckMark(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 7L8.5 12.5L6 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ChoiceCheckMark = chakra(CheckMark);

export function ChoiceField(props: ChoiceFieldProps) {
  const {
    kind,
    name,
    legend,
    options,
    layout = kind === "checkbox" ? "column" : "row",
    padded,
    required,
    invalid,
    errorText,
  } = props;
  const recipe = useSlotRecipe({ recipe: choiceFieldSlotRecipe });
  const styles = recipe({ type: kind, layout, padded });

  if (props.kind === "radio") {
    const { value, onValueChange } = props;
    const controlled = onValueChange
      ? {
          value: value || null,
          onValueChange: (details: { value: string | null }) => onValueChange(details.value ?? ""),
        }
      : {};

    return (
      <Fieldset.Root unstyled css={styles.root} invalid={invalid}>
        <Fieldset.Legend css={styles.legend}>{legend}</Fieldset.Legend>
        <RadioGroup.Root
          unstyled
          css={styles.group}
          name={name}
          required={required}
          invalid={invalid}
          {...controlled}
        >
          {options.map((option) => (
            <RadioGroup.Item key={option.value} value={option.value} css={styles.item}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl css={styles.control} data-choice-control="" />
              <RadioGroup.ItemText css={styles.label}>{option.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <Fieldset.ErrorText css={styles.errorText}>{errorText}</Fieldset.ErrorText>
      </Fieldset.Root>
    );
  }

  const { value, onValueChange } = props;
  const controlled = onValueChange ? { value: value ?? [], onValueChange } : {};

  return (
    <Fieldset.Root unstyled css={styles.root} invalid={invalid}>
      <Fieldset.Legend css={styles.legend}>{legend}</Fieldset.Legend>
      <CheckboxGroup css={styles.group} name={name} invalid={invalid} {...controlled}>
        {options.map((option) => (
          <Checkbox.Root key={option.value} unstyled css={styles.item} value={option.value}>
            <Checkbox.HiddenInput />
            <Checkbox.Control css={styles.control} data-choice-control="">
              <ChoiceCheckMark css={styles.indicator} />
            </Checkbox.Control>
            <Checkbox.Label css={styles.label}>{option.label}</Checkbox.Label>
          </Checkbox.Root>
        ))}
      </CheckboxGroup>
      <Fieldset.ErrorText css={styles.errorText}>{errorText}</Fieldset.ErrorText>
    </Fieldset.Root>
  );
}
