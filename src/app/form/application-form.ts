import { parseFormConfig } from "@/components/trango/components";
import definition from "./application-form.json";

/** The application form, validated from its JSON definition. */
export const applicationForm = parseFormConfig(definition);
