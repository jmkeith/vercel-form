"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form, type FormRootProps } from "../Form";
import { FormField } from "./FormField";
import { RichText } from "./RichText";
import type { FormBlock, FormConfig } from "./schema";
import { useFormSession, useFormStore } from "./store";
import { postFormData, type FormSubmitter } from "./submit";
import { buildFormSchema, getDefaultValues, type FormValues } from "./validation";

export interface JsonFormProps {
  /** A parsed form definition; see `parseFormConfig`. */
  config: FormConfig;
  /** "card" (default) draws an outline; "plain" suits an already framed area. */
  chrome?: FormRootProps["chrome"];
  /** Sends the validated answers. Defaults to posting them to `config.action`. */
  onSubmit?: FormSubmitter;
}

function Block({ block }: { block: FormBlock }) {
  switch (block.kind) {
    case "grid":
      return (
        <Form.Grid>
          {block.fields.map((field) => (
            <Form.Cell key={field.name} span={field.span}>
              <FormField field={field} />
            </Form.Cell>
          ))}
        </Form.Grid>
      );
    case "stack":
      return (
        <Form.Stack>
          {block.intro ? (
            <Form.Prose>
              {block.intro.map((paragraph, index) => (
                <p key={index}>
                  <RichText content={paragraph} />
                </p>
              ))}
            </Form.Prose>
          ) : null}
          {block.fields.map((field) => (
            <FormField key={field.name} field={field} />
          ))}
        </Form.Stack>
      );
    case "divider":
      return <Form.Divider />;
    case "note":
      return (
        <Form.Note>
          <RichText content={block.content} />
        </Form.Note>
      );
  }
}

/**
 * Builds a working form from a JSON definition: react-hook-form holds the
 * state, a zod schema derived from the definition validates it, and the
 * zustand store shares the answers and submission status with other components.
 */
export function JsonForm({ config, chrome, onSubmit = postFormData }: JsonFormProps) {
  const schema = useMemo(() => buildFormSchema(config), [config]);
  const defaultValues = useMemo(() => getDefaultValues(config), [config]);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });
  const { handleSubmit, setError, subscribe } = form;

  const session = useFormSession(config.id);
  const setValues = useFormStore((state) => state.setValues);
  const submit = useFormStore((state) => state.submit);
  const submitting = session.status === "submitting";

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ values }) => setValues(config.id, values),
      }),
    [subscribe, setValues, config.id],
  );

  const send = handleSubmit(async (values) => {
    const result = await submit(config.id, values, async () => {
      const outcome = await onSubmit(values, config);
      return outcome.ok && !outcome.message
        ? { ...outcome, message: config.successMessage }
        : outcome;
    });

    Object.entries(result.fieldErrors ?? {}).forEach(([name, message], index) =>
      setError(name, { type: "server", message }, { shouldFocus: index === 0 }),
    );
  });

  return (
    <FormProvider {...form}>
      <Form.Root id={config.id} chrome={chrome} noValidate aria-busy={submitting} onSubmit={send}>
        {config.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
        <Form.Footer>
          {session.message ? (
            <Form.Status role="status" data-status={session.status}>
              {session.message}
            </Form.Status>
          ) : null}
          <Form.Submit type="submit" disabled={submitting}>
            <span>{submitting ? "Submitting…" : config.submitLabel}</span>
          </Form.Submit>
        </Form.Footer>
      </Form.Root>
    </FormProvider>
  );
}
