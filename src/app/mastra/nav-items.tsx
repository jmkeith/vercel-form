"use client";

import { Badge } from "@chakra-ui/react";
import {
  GoBook,
  GoGear,
  GoGitPullRequest,
  GoGraph,
  GoHome,
  GoIssueOpened,
  GoPeople,
  GoRepo,
  GoShield,
} from "react-icons/go";
import { CollapsibleNavList } from "@/components/trango/components";

/** The navigation the demo sidebars share. */
export function DemoNavItems({ current = "Issues" }: { current?: string }) {
  const page = (label: string) => (label === current ? "page" : undefined);
  return (
    <>
      <CollapsibleNavList.Item href="#home" icon={<GoHome />} label="Home" aria-current={page("Home")} />
      <CollapsibleNavList.Item
        href="#issues"
        icon={<GoIssueOpened />}
        label="Issues"
        aria-current={page("Issues")}
        trailingVisual={<Badge size="xs">12</Badge>}
      />
      <CollapsibleNavList.Item
        href="#pulls"
        icon={<GoGitPullRequest />}
        label="Pull requests"
        aria-current={page("Pull requests")}
        trailingVisual={<Badge size="xs">3</Badge>}
      />
      <CollapsibleNavList.Item href="#repos" icon={<GoRepo />} label="Repositories" />
      <CollapsibleNavList.Group title="Insights" icon={<GoGraph />}>
        <CollapsibleNavList.Item href="#traffic" icon={<GoGraph />} label="Traffic" />
        <CollapsibleNavList.Item href="#people" icon={<GoPeople />} label="Contributors" />
      </CollapsibleNavList.Group>
      <CollapsibleNavList.Group title="Administration">
        <CollapsibleNavList.Item href="#security" icon={<GoShield />} label="Security" />
        <CollapsibleNavList.Item href="#settings" icon={<GoGear />} label="Settings" />
        <CollapsibleNavList.Item href="#docs" icon={<GoBook />} label="Documentation" />
      </CollapsibleNavList.Group>
    </>
  );
}
