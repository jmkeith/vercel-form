import type { Metadata } from "next";
import {
  GridBand,
  Hero,
  SiteMain,
} from "@/components/sites/vercel-com-44cb5a40/shared";
import { applicationForm } from "./application-form";
import { ApplicationForm } from "./ApplicationForm";

const role = {
  title: "App Form",
  description: "Application form",
};

export const metadata: Metadata = role;

export default function FormPage() {
  return (
    <SiteMain>
      <GridBand />
      <Hero title="App Form" description="Form for applications" />
      <GridBand />
      <ApplicationForm heading="Apply" config={applicationForm} />
    </SiteMain>
  );
}
