"use client";

import { chakra, FileUpload, useSlotRecipe } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { LuCloudUpload } from "react-icons/lu";
import { fileFieldSlotRecipe } from "./FileField.recipe";

export interface FileFieldProps {
  /** Submitted form key. */
  name: string;
  label: ReactNode;
  buttonLabel: string;
  helperText?: ReactNode;
  /** MIME types offered by the file picker, e.g. ["application/pdf"]. */
  accept?: string[];
  /** Bytes. Larger files are rejected by the field itself. */
  maxFileSize?: number;
  required?: boolean;
  invalid?: boolean;
  errorText?: ReactNode;
  /** Controlled file. Leave `onFileChange` unset to let the field manage it. */
  file?: File | null;
  /** Called with the chosen file as picked, before any `accept` or `maxFileSize` check. */
  onFileChange?: (file: File | null) => void;
}

export function FileField({
  name,
  label,
  buttonLabel,
  helperText,
  accept,
  maxFileSize,
  required,
  invalid,
  errorText,
  file,
  onFileChange,
}: FileFieldProps) {
  const recipe = useSlotRecipe({ recipe: fileFieldSlotRecipe });
  const styles = recipe();
  const controlled = onFileChange !== undefined;

  return (
    <FileUpload.Root
      unstyled
      css={styles.root}
      name={name}
      accept={accept}
      maxFiles={1}
      maxFileSize={maxFileSize}
      required={required}
      invalid={invalid}
    >
      <FileUpload.Label css={styles.label}>{label}</FileUpload.Label>
      <chakra.div css={styles.row}>
        <FileUpload.HiddenInput
          onChange={
            // Read the picker directly: Chakra keeps its own accepted list, which
            // holds on to the first file and hides ones it rejects.
            controlled
              ? (event) => onFileChange(event.currentTarget.files?.[0] ?? null)
              : undefined
          }
        />
        <FileUpload.Trigger
          css={styles.trigger}
          data-invalid={invalid ? "" : undefined}
        >
          <chakra.span css={styles.triggerContent}>
            <LuCloudUpload size={16} />
            {controlled ? (
              <span>{file?.name ?? buttonLabel}</span>
            ) : (
              <FileUpload.FileText fallback={buttonLabel} />
            )}
          </chakra.span>
        </FileUpload.Trigger>
        {helperText ? (
          <chakra.div css={styles.helperText}>{helperText}</chakra.div>
        ) : null}
      </chakra.div>
      {invalid && errorText ? (
        <chakra.p css={styles.errorText} role="alert">
          {errorText}
        </chakra.p>
      ) : null}
    </FileUpload.Root>
  );
}
