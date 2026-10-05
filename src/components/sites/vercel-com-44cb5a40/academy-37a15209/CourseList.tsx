import {
  SiteContent,
  SiteContentItem,
  SiteContentItemDescription,
  SiteContentItemTitle,
} from "../shared";
import { ACADEMY_BASE_URL } from "./content";
import type { Course } from "./types";

interface CourseListProps {
  heading: string;
  courses: Course[];
}

export function CourseList({ heading, courses }: CourseListProps) {
  return (
    <SiteContent heading={heading}>
      {courses.map((course) => (
        <SiteContentItem
          key={course.slug}
          href={`${ACADEMY_BASE_URL}/${course.slug}`}
          aria-label={`View ${course.title} course`}
        >
          <SiteContentItemTitle>{course.title}</SiteContentItemTitle>
          <SiteContentItemDescription>{course.description}</SiteContentItemDescription>
        </SiteContentItem>
      ))}
    </SiteContent>
  );
}
