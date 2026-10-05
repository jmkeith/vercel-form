"use client";

import { SiteContent } from "@/components/sites/vercel-com-44cb5a40/shared";
import { JsonForm, JsonFormSummary, type FormConfig } from "@/components/trango/components";

/** The application form with a live results panel to its right. */
export function ApplicationForm({ heading, config }: { heading: string; config: FormConfig }) {
  return (
    <SiteContent
      heading={heading}
      headingPlacement="top"
      aside={<JsonFormSummary config={config} />}
    >
      <JsonForm config={config} chrome="plain" />
    </SiteContent>
  );
}
