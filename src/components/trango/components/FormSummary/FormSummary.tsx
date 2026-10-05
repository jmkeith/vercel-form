"use client";

import { createSlotRecipeContext } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { formSummarySlotRecipe } from "./FormSummary.recipe";

const { withProvider, withContext } = createSlotRecipeContext({ recipe: formSummarySlotRecipe });

export const FormSummaryRoot = withProvider<HTMLDivElement, React.ComponentProps<"div">>(
  "div",
  "root",
);
export const FormSummaryTitle = withContext<HTMLHeadingElement, React.ComponentProps<"h3">>(
  "h3",
  "title",
);
export const FormSummaryProgress = withContext<HTMLParagraphElement, React.ComponentProps<"p">>(
  "p",
  "progress",
);
export const FormSummaryStatus = withContext<HTMLParagraphElement, React.ComponentProps<"p">>(
  "p",
  "status",
);
export const FormSummaryEmpty = withContext<HTMLParagraphElement, React.ComponentProps<"p">>(
  "p",
  "empty",
);
export const FormSummaryList = withContext<HTMLDListElement, React.ComponentProps<"dl">>(
  "dl",
  "list",
);
export const FormSummaryItem = withContext<HTMLDivElement, React.ComponentProps<"div">>(
  "div",
  "item",
);
export const FormSummaryQuestion = withContext<HTMLElement, React.ComponentProps<"dt">>(
  "dt",
  "question",
);
export const FormSummaryAnswer = withContext<HTMLElement, React.ComponentProps<"dd">>(
  "dd",
  "answer",
);

export interface FormSummaryEntry {
  key: string;
  question: ReactNode;
  answer: ReactNode;
}

export interface FormSummaryProps {
  entries: FormSummaryEntry[];
  title?: ReactNode;
  /** Line under the title, e.g. "3 of 12 required answered". */
  progress?: ReactNode;
  /** Outcome message, e.g. after submitting. */
  status?: ReactNode;
  statusTone?: "info" | "error";
  emptyText?: ReactNode;
}

/** Read-out of a form's answers. */
export function FormSummary({
  entries,
  title = "Your answers",
  progress,
  status,
  statusTone = "info",
  emptyText = "Answers appear here as you fill in the form.",
}: FormSummaryProps) {
  return (
    <FormSummaryRoot aria-live="polite">
      <FormSummaryTitle>{title}</FormSummaryTitle>
      {progress ? <FormSummaryProgress>{progress}</FormSummaryProgress> : null}
      {status ? (
        <FormSummaryStatus role="status" data-status={statusTone}>
          {status}
        </FormSummaryStatus>
      ) : null}
      {entries.length === 0 ? (
        <FormSummaryEmpty>{emptyText}</FormSummaryEmpty>
      ) : (
        <FormSummaryList>
          {entries.map((entry) => (
            <FormSummaryItem key={entry.key}>
              <FormSummaryQuestion>{entry.question}</FormSummaryQuestion>
              <FormSummaryAnswer>{entry.answer}</FormSummaryAnswer>
            </FormSummaryItem>
          ))}
        </FormSummaryList>
      )}
    </FormSummaryRoot>
  );
}
