import { countryKey, getFields, type FormConfig } from "./schema";
import type { FormValues } from "./validation";

export interface SubmitResult {
  ok: boolean;
  message?: string;
  /** Per-field messages from the server, keyed by field name. */
  fieldErrors?: Record<string, string>;
}

export type FormSubmitter = (values: FormValues, config: FormConfig) => Promise<SubmitResult>;

/** Answers as multipart form data; unanswered fields are left out. */
export function toFormData(values: FormValues): FormData {
  const data = new FormData();

  for (const [name, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      for (const item of value) data.append(name, item);
    } else if (value instanceof File) {
      data.append(name, value, value.name);
    } else if (value) {
      data.append(name, value);
    }
  }

  return data;
}

/** Reads a form's answers back out of multipart form data, e.g. in a route handler. */
export function fromFormData(config: FormConfig, data: FormData): FormValues {
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  const values: FormValues = {};

  for (const field of getFields(config)) {
    switch (field.kind) {
      case "text":
      case "radio":
        values[field.name] = text(field.name);
        break;
      case "phone":
        values[field.name] = text(field.name);
        values[countryKey(field.name)] = text(countryKey(field.name));
        break;
      case "file": {
        const value = data.get(field.name);
        values[field.name] = value instanceof File && value.size > 0 ? value : null;
        break;
      }
      case "checkbox":
        values[field.name] = data
          .getAll(field.name)
          .filter((value): value is string => typeof value === "string");
        break;
    }
  }

  return values;
}

/**
 * Default submitter: posts the answers to the definition's `action` and reads
 * back a `SubmitResult` as JSON.
 */
export const postFormData: FormSubmitter = async (values, config) => {
  if (!config.action) {
    return { ok: false, message: "This form has no submit action configured." };
  }

  const response = await fetch(config.action, { method: "POST", body: toFormData(values) });
  const result = (await response.json().catch(() => null)) as SubmitResult | null;

  if (result && typeof result.ok === "boolean") return result;
  return { ok: false, message: `Submission failed (${response.status}).` };
};
