import { z } from "zod";
import { countryKey, getFields, type FieldConfig, type FormConfig } from "./schema";

export type FieldValue = string | string[] | File | null;
export type FormValues = Record<string, FieldValue>;

const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/;

const megabytes = (bytes: number) => `${Math.round((bytes / (1024 * 1024)) * 10) / 10}MB`;

type Check = (message: string) => void;

function textSchema(field: Extract<FieldConfig, { kind: "text" }>) {
  return z.string().superRefine((raw, ctx) => {
    const fail: Check = (message) => ctx.addIssue({ code: "custom", message });
    const value = raw.trim();

    if (!value) {
      if (field.required) fail(`${field.label} is required.`);
      return;
    }
    if (field.minLength && value.length < field.minLength) {
      return fail(`${field.label} must be at least ${field.minLength} characters.`);
    }
    if (field.maxLength && value.length > field.maxLength) {
      return fail(`${field.label} must be at most ${field.maxLength} characters.`);
    }
    if (field.type === "email" && !z.email().safeParse(value).success) {
      return fail("Enter a valid email address.");
    }
    if (field.type === "url" && !z.url().safeParse(value).success) {
      return fail("Enter a valid URL.");
    }
    if (field.pattern && !new RegExp(field.pattern).test(value)) {
      return fail(field.patternMessage ?? `${field.label} is not in the expected format.`);
    }
  });
}

function phoneSchema(field: Extract<FieldConfig, { kind: "phone" }>) {
  return z.string().superRefine((raw, ctx) => {
    const value = raw.trim();
    if (!value) {
      if (field.required) ctx.addIssue({ code: "custom", message: `${field.label} is required.` });
      return;
    }
    if (!PHONE_PATTERN.test(value)) {
      ctx.addIssue({ code: "custom", message: "Enter a valid phone number." });
    }
  });
}

function fileSchema(field: Extract<FieldConfig, { kind: "file" }>) {
  return z
    .custom<File | null>((value) => value === null || value instanceof File)
    .superRefine((file, ctx) => {
      const fail: Check = (message) => ctx.addIssue({ code: "custom", message });

      if (!file) {
        if (field.required) fail("Choose a file.");
        return;
      }
      if (field.accept && !field.accept.includes(file.type)) {
        return fail("This file type is not accepted.");
      }
      if (field.maxFileSize && file.size > field.maxFileSize) {
        return fail(`The file must be ${megabytes(field.maxFileSize)} or smaller.`);
      }
    });
}

function choiceSchema(field: Extract<FieldConfig, { kind: "radio" | "checkbox" }>) {
  const allowed = new Set(field.options.map((option) => option.value));

  if (field.kind === "radio") {
    return z.string().superRefine((value, ctx) => {
      if (!value) {
        if (field.required) ctx.addIssue({ code: "custom", message: "Select an option." });
      } else if (!allowed.has(value)) {
        ctx.addIssue({ code: "custom", message: "Select one of the listed options." });
      }
    });
  }

  return z.array(z.string()).superRefine((values, ctx) => {
    if (values.length === 0) {
      if (field.required) ctx.addIssue({ code: "custom", message: "Select at least one option." });
    } else if (values.some((value) => !allowed.has(value))) {
      ctx.addIssue({ code: "custom", message: "Select only the listed options." });
    }
  });
}

/**
 * Builds the zod schema for a form's answers from its definition. The same
 * schema runs in the browser (through react-hook-form) and on the server.
 */
export function buildFormSchema(config: FormConfig): z.ZodType<FormValues, FormValues> {
  const shape: Record<string, z.ZodType> = {};

  for (const field of getFields(config)) {
    switch (field.kind) {
      case "text":
        shape[field.name] = textSchema(field);
        break;
      case "phone":
        shape[field.name] = phoneSchema(field);
        shape[countryKey(field.name)] = z.string();
        break;
      case "file":
        shape[field.name] = fileSchema(field);
        break;
      case "radio":
      case "checkbox":
        shape[field.name] = choiceSchema(field);
        break;
    }
  }

  return z.object(shape) as unknown as z.ZodType<FormValues, FormValues>;
}

/** The empty answer for every field of a form. */
export function getDefaultValues(config: FormConfig): FormValues {
  const values: FormValues = {};

  for (const field of getFields(config)) {
    switch (field.kind) {
      case "text":
      case "radio":
        values[field.name] = "";
        break;
      case "phone":
        values[field.name] = "";
        values[countryKey(field.name)] = field.defaultCountry ?? "US";
        break;
      case "file":
        values[field.name] = null;
        break;
      case "checkbox":
        values[field.name] = [];
        break;
    }
  }

  return values;
}
