"use client";

import type { ReactNode } from "react";
import { FormSummary } from "../FormSummary";
import { RichText } from "./RichText";
import { getFields, type FieldConfig, type FormConfig } from "./schema";
import { useFormSession } from "./store";
import type { FormValues } from "./validation";

/** The answer to one field as display text, or null when it is unanswered. */
function readAnswer(field: FieldConfig, values: FormValues): string | null {
  const value = values[field.name];

  switch (field.kind) {
    case "text": {
      const text = typeof value === "string" ? value.trim() : "";
      return text ? `${field.prefix ?? ""}${text}` : null;
    }
    case "phone":
      return (typeof value === "string" && value.trim()) || null;
    case "file":
      return value instanceof File ? value.name : null;
    case "radio":
    case "checkbox": {
      const selected = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
      const labels = field.options
        .filter((option) => selected.includes(option.value))
        .map((option) => option.label);
      return labels.length > 0 ? labels.join(", ") : null;
    }
  }
}

const fieldTitle = (field: FieldConfig): ReactNode =>
  "legend" in field ? <RichText content={field.legend} /> : field.label;

export interface JsonFormSummaryProps {
  /** The same definition the form was built from. */
  config: FormConfig;
  title?: ReactNode;
  emptyText?: ReactNode;
}

/** Live read-out of a `JsonForm`'s answers and submission outcome. */
export function JsonFormSummary({ config, title, emptyText }: JsonFormSummaryProps) {
  const session = useFormSession(config.id);
  const fields = getFields(config);
  const answered = fields.flatMap((field) => {
    const answer = readAnswer(field, session.values);
    return answer === null ? [] : [{ field, answer }];
  });
  const required = fields.filter((field) => field.required);
  const requiredAnswered = answered.filter(({ field }) => field.required).length;

  return (
    <FormSummary
      title={title}
      emptyText={emptyText}
      progress={
        required.length > 0
          ? `${requiredAnswered} of ${required.length} required answered`
          : undefined
      }
      status={session.message}
      statusTone={session.status === "error" ? "error" : "info"}
      entries={answered.map(({ field, answer }) => ({
        key: field.name,
        question: fieldTitle(field),
        answer,
      }))}
    />
  );
}
