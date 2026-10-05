"use client";

import { useController } from "react-hook-form";
import { ChoiceField } from "../ChoiceField";
import { FileField } from "../FileField";
import { PhoneField } from "../PhoneField";
import { TextField } from "../TextField";
import { RichText } from "./RichText";
import {
  countryKey,
  type ChoiceFieldConfig,
  type FieldConfig,
  type FileFieldConfig,
  type PhoneFieldConfig,
  type TextFieldConfig,
} from "./schema";
import type { FormValues } from "./validation";

function TextFormField({ field: config }: { field: TextFieldConfig }) {
  const { field, fieldState } = useController<FormValues>({ name: config.name });

  return (
    <TextField
      name={config.name}
      label={config.label}
      type={config.type}
      placeholder={config.placeholder}
      prefix={config.prefix}
      helperText={config.helperText ? <RichText content={config.helperText} /> : undefined}
      ariaLabel={config.ariaLabel}
      autoComplete={config.autoComplete}
      maxLength={config.maxLength}
      required={config.required}
      invalid={fieldState.invalid}
      errorText={fieldState.error?.message}
      inputProps={{
        ref: field.ref,
        value: typeof field.value === "string" ? field.value : "",
        onChange: field.onChange,
        onBlur: field.onBlur,
      }}
    />
  );
}

function PhoneFormField({ field: config }: { field: PhoneFieldConfig }) {
  const number = useController<FormValues>({ name: config.name });
  const country = useController<FormValues>({ name: countryKey(config.name) });

  return (
    <PhoneField
      name={config.name}
      label={config.label}
      placeholder={config.placeholder}
      defaultCountry={config.defaultCountry}
      country={typeof country.field.value === "string" ? country.field.value : undefined}
      onCountryChange={country.field.onChange}
      required={config.required}
      invalid={number.fieldState.invalid}
      errorText={number.fieldState.error?.message}
      inputProps={{
        ref: number.field.ref,
        value: typeof number.field.value === "string" ? number.field.value : "",
        onChange: number.field.onChange,
        onBlur: number.field.onBlur,
      }}
    />
  );
}

function FileFormField({ field: config }: { field: FileFieldConfig }) {
  const { field, fieldState } = useController<FormValues>({ name: config.name });

  return (
    <FileField
      name={config.name}
      label={config.label}
      buttonLabel={config.buttonLabel}
      helperText={config.helperText ? <RichText content={config.helperText} /> : undefined}
      accept={config.accept}
      required={config.required}
      invalid={fieldState.invalid}
      errorText={fieldState.error?.message}
      file={field.value instanceof File ? field.value : null}
      onFileChange={(file) => {
        field.onChange(file);
        // A file picker never blurs, so mark the field touched to validate the choice now.
        field.onBlur();
      }}
    />
  );
}

function ChoiceFormField({ field: config }: { field: ChoiceFieldConfig }) {
  const { field, fieldState } = useController<FormValues>({ name: config.name });
  const shared = {
    name: config.name,
    legend: <RichText content={config.legend} />,
    options: config.options,
    layout: config.layout,
    padded: config.padded,
    required: config.required,
    invalid: fieldState.invalid,
    errorText: fieldState.error?.message,
    onValueChange: field.onChange,
  };

  return config.kind === "radio" ? (
    <ChoiceField kind="radio" value={typeof field.value === "string" ? field.value : ""} {...shared} />
  ) : (
    <ChoiceField kind="checkbox" value={Array.isArray(field.value) ? field.value : []} {...shared} />
  );
}

/** Renders the field that matches a definition entry's `kind`, bound to the surrounding form. */
export function FormField({ field }: { field: FieldConfig }) {
  switch (field.kind) {
    case "text":
      return <TextFormField field={field} />;
    case "phone":
      return <PhoneFormField field={field} />;
    case "file":
      return <FileFormField field={field} />;
    case "radio":
    case "checkbox":
      return <ChoiceFormField field={field} />;
  }
}
