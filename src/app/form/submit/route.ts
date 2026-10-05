import {
  buildFormSchema,
  fromFormData,
  type SubmitResult,
} from "@/components/trango/components";
import { applicationForm } from "../application-form";

const schema = buildFormSchema(applicationForm);

/**
 * Receives the application form. Answers are validated again with the schema
 * the browser uses; there is no storage behind this demo, so valid submissions
 * are acknowledged and dropped.
 */
export async function POST(request: Request) {
  const values = fromFormData(applicationForm, await request.formData());
  const result = schema.safeParse(values);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const name = String(issue.path[0] ?? "");
      if (name && !(name in fieldErrors)) fieldErrors[name] = issue.message;
    }
    return Response.json(
      { ok: false, message: "Some answers need attention.", fieldErrors } satisfies SubmitResult,
      { status: 422 },
    );
  }

  return Response.json({
    ok: true,
    message: applicationForm.successMessage,
  } satisfies SubmitResult);
}
