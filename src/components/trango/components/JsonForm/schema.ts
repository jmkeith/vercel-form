import { z } from "zod";

/**
 * Inline text for a JSON form definition: a plain string, or a list of runs
 * where a run is a string or an object adding emphasis or a link.
 */
const richTextRunSchema = z.union([
  z.string(),
  z.object({
    text: z.string(),
    strong: z.boolean().optional(),
    underline: z.boolean().optional(),
    href: z.string().optional(),
    /** Opens in a new tab and shows an arrow after the text. */
    external: z.boolean().optional(),
  }),
]);

export const richTextSchema = z.union([z.string(), z.array(richTextRunSchema)]);

const fieldBase = {
  /** Submitted form key. */
  name: z.string().min(1),
  required: z.boolean().optional(),
  /** Width inside a two-column grid block. Defaults to "half". */
  span: z.enum(["half", "full"]).optional(),
};

const textFieldSchema = z.object({
  ...fieldBase,
  kind: z.literal("text"),
  label: z.string(),
  type: z.enum(["text", "email", "url"]).optional(),
  placeholder: z.string().optional(),
  /** Static text shown in an addon before the input, e.g. "github.com/". */
  prefix: z.string().optional(),
  helperText: richTextSchema.optional(),
  ariaLabel: z.string().optional(),
  autoComplete: z.string().optional(),
  minLength: z.number().int().positive().optional(),
  maxLength: z.number().int().positive().optional(),
  /** Regular expression source the value must match. */
  pattern: z.string().optional(),
  /** Error shown when `pattern` does not match. */
  patternMessage: z.string().optional(),
});

const phoneFieldSchema = z.object({
  ...fieldBase,
  kind: z.literal("phone"),
  label: z.string(),
  placeholder: z.string().optional(),
  /** ISO 3166-1 alpha-2 code; "ZZ" means international. */
  defaultCountry: z.string().optional(),
});

const fileFieldSchema = z.object({
  ...fieldBase,
  kind: z.literal("file"),
  label: z.string(),
  buttonLabel: z.string(),
  helperText: richTextSchema.optional(),
  /** MIME types, e.g. ["application/pdf"]. */
  accept: z.array(z.string()).optional(),
  /** Bytes. */
  maxFileSize: z.number().positive().optional(),
});

const choiceFieldSchema = z.object({
  ...fieldBase,
  /** "radio" picks one option, "checkbox" picks any number. */
  kind: z.enum(["radio", "checkbox"]),
  legend: richTextSchema,
  options: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
  /** "row": one line; "wrap": wrapping row; "column": one option per line. */
  layout: z.enum(["row", "wrap", "column"]).optional(),
  /** Adds the extra space the grid questions have below their options. */
  padded: z.boolean().optional(),
});

export const fieldSchema = z.union([
  textFieldSchema,
  phoneFieldSchema,
  fileFieldSchema,
  choiceFieldSchema,
]);

export const formBlockSchema = z.union([
  /** Two-column grid from the `md` breakpoint, stacked below it. */
  z.object({ kind: z.literal("grid"), fields: z.array(fieldSchema) }),
  /** Single column with optional introductory paragraphs. */
  z.object({
    kind: z.literal("stack"),
    intro: z.array(richTextSchema).optional(),
    fields: z.array(fieldSchema),
  }),
  /** Full-bleed dashed rule. */
  z.object({ kind: z.literal("divider") }),
  /** Short paragraph introducing the next block. */
  z.object({ kind: z.literal("note"), content: richTextSchema }),
]);

export const formConfigSchema = z.object({
  id: z.string().min(1),
  submitLabel: z.string(),
  /** URL the default submitter posts the answers to as multipart form data. */
  action: z.string().optional(),
  /** Shown after a successful submission when the server sends no message. */
  successMessage: z.string().optional(),
  blocks: z.array(formBlockSchema),
});

export type RichTextContent = z.infer<typeof richTextSchema>;
export type TextFieldConfig = z.infer<typeof textFieldSchema>;
export type PhoneFieldConfig = z.infer<typeof phoneFieldSchema>;
export type FileFieldConfig = z.infer<typeof fileFieldSchema>;
export type ChoiceFieldConfig = z.infer<typeof choiceFieldSchema>;
export type FieldConfig = z.infer<typeof fieldSchema>;
export type FormBlock = z.infer<typeof formBlockSchema>;
export type FormConfig = z.infer<typeof formConfigSchema>;

/** Every field of a form, in document order. */
export const getFields = (config: FormConfig): FieldConfig[] =>
  config.blocks.flatMap((block) => ("fields" in block ? block.fields : []));

/** Key the country of a phone field is stored and submitted under. */
export const countryKey = (name: string) => `${name}_country`;

/** Rich text reduced to its characters, for messages and labels. */
export const plainText = (content: RichTextContent): string =>
  typeof content === "string"
    ? content
    : content.map((run) => (typeof run === "string" ? run : run.text)).join("");

/**
 * Validates a form definition (typically an imported JSON file) and returns it
 * typed. Throws with the offending paths when the definition is malformed.
 */
export function parseFormConfig(input: unknown): FormConfig {
  const result = formConfigSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid form definition:\n${z.prettifyError(result.error)}`);
  }

  const seen = new Set<string>();
  for (const field of getFields(result.data)) {
    const keys = field.kind === "phone" ? [field.name, countryKey(field.name)] : [field.name];
    for (const key of keys) {
      if (seen.has(key)) {
        throw new Error(`Invalid form definition: duplicate field name "${key}".`);
      }
      seen.add(key);
    }
  }

  return result.data;
}
