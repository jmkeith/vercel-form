import { create } from "zustand";
import type { SubmitResult } from "./submit";
import type { FormValues } from "./validation";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface FormSession {
  /** Latest answers, mirrored from the form as the user types. */
  values: FormValues;
  status: SubmissionStatus;
  /** Outcome of the last submission. */
  message: string | null;
}

interface FormStore {
  /** One session per form id, so any component can follow a form. */
  sessions: Record<string, FormSession>;
  setValues: (id: string, values: FormValues) => void;
  /** Runs `send`, tracking its progress and outcome in the session. */
  submit: (id: string, values: FormValues, send: () => Promise<SubmitResult>) => Promise<SubmitResult>;
  reset: (id: string) => void;
}

const EMPTY_SESSION: FormSession = { values: {}, status: "idle", message: null };

export const useFormStore = create<FormStore>()((set, get) => {
  const patch = (id: string, changes: Partial<FormSession>) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [id]: { ...(state.sessions[id] ?? EMPTY_SESSION), ...changes },
      },
    }));

  return {
    sessions: {},
    setValues: (id, values) => {
      const settled = (get().sessions[id] ?? EMPTY_SESSION).status !== "submitting";
      // Editing after a submission clears its outcome.
      patch(id, settled ? { values, status: "idle", message: null } : { values });
    },
    submit: async (id, values, send) => {
      patch(id, { values, status: "submitting", message: null });
      let result: SubmitResult;
      try {
        result = await send();
      } catch {
        result = { ok: false, message: "Something went wrong. Please try again." };
      }
      patch(id, {
        status: result.ok ? "success" : "error",
        message: result.message ?? (result.ok ? "Submitted." : "Submission failed."),
      });
      return result;
    },
    reset: (id) => patch(id, EMPTY_SESSION),
  };
});

/** The live session of one form: its answers and submission state. */
export const useFormSession = (id: string): FormSession =>
  useFormStore((state) => state.sessions[id] ?? EMPTY_SESSION);
