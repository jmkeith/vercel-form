import type { Metadata } from "next";
import { courses, hero } from "@/components/sites/vercel-com-44cb5a40/academy-37a15209/content";
import { CourseList } from "@/components/sites/vercel-com-44cb5a40/academy-37a15209/CourseList";
import { GridBand, Hero, SiteMain } from "@/components/sites/vercel-com-44cb5a40/shared";

export const metadata: Metadata = {
  title: hero.title,
  description: hero.description,
};

export default function Home() {
  return (
    <SiteMain>
      <GridBand />
      <Hero title={hero.title} description={hero.description} />
      <GridBand />
      <CourseList heading="Courses" courses={courses} />
    </SiteMain>
  );
}
