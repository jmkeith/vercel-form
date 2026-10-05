import { Fragment } from "react";
import type { RichTextContent } from "./schema";

/** Renders the rich text of a JSON form definition as inline elements. */
export function RichText({ content }: { content: RichTextContent }) {
  if (typeof content === "string") return content;

  return content.map((run, index) => {
    if (typeof run === "string") return <Fragment key={index}>{run}</Fragment>;

    let node: React.ReactNode = run.text;
    if (run.strong) node = <strong>{node}</strong>;
    if (run.underline) node = <u>{node}</u>;
    if (run.href) {
      node = run.external ? (
        <a href={run.href} target="_blank" rel="noopener noreferrer">
          {node} <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <a href={run.href}>{node}</a>
      );
    }
    return <Fragment key={index}>{node}</Fragment>;
  });
}
