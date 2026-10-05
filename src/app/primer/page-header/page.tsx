"use client";

import {
  Badge,
  Box,
  Breadcrumb,
  Button,
  Code,
  Heading,
  IconButton,
  Link,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import {
  GoChecklist,
  GoCommentDiscussion,
  GoFileDiff,
  GoGear,
  GoGitBranch,
  GoGitCommit,
  GoGitPullRequest,
  GoGraph,
  GoKebabHorizontal,
  GoPencil,
  GoSidebarExpand,
  GoTriangleDown,
  GoWorkflow,
} from "react-icons/go";
import { PageHeader } from "@/components/trango/components/PageHeader";

interface DemoProps {
  title: string;
  note?: ReactNode;
  children: ReactNode;
}

function Demo({ title, note, children }: DemoProps) {
  return (
    <Box as="section">
      <Heading as="h2" size="md" marginBottom="1">
        {title}
      </Heading>
      {note ? (
        <Text fontSize="sm" color="fg.muted" marginBottom="3">
          {note}
        </Text>
      ) : null}
      <Box padding="16px" borderWidth="1px" borderColor="border" borderRadius="6px" bg="bg">
        {children}
      </Box>
    </Box>
  );
}

function PullRequestTabs() {
  return (
    <Tabs.Root defaultValue="conversation" variant="line" size="sm">
      <Tabs.List>
        <Tabs.Trigger value="conversation">
          <GoCommentDiscussion />
          Conversation
          <Badge size="xs">12</Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="commits">
          <GoGitCommit />
          Commits
          <Badge size="xs">3</Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="checks">
          <GoChecklist />
          Checks
          <Badge size="xs">7</Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="files">
          <GoFileDiff />
          Files Changes
          <Badge size="xs">4</Badge>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}

function RepoBreadcrumbs() {
  return (
    <Breadcrumb.Root size="sm">
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="https://github.com/primer/react/tree/main">react</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="https://github.com/primer/react/tree/main/src">
            src
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>PageHeader</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}

const responsiveVariantSnippet = 'size={{ base: "medium", md: "subtitle", xl: "large" }}';

export default function PageHeaderDemoPage() {
  return (
    <Box bg="bg.subtle" color="fg" minHeight="100vh" paddingY="10" paddingX="4">
      <Stack gap="10" maxWidth="1100px" marginX="auto">
        <Box>
          <Heading as="h1" size="2xl">
            PageHeader
          </Heading>
          <Text color="fg.muted">
            Primer React PageHeader as a Chakra UI slot recipe. Resize the window: the layout changes at
            the `md` (768px) and `xl` (1280px) breakpoints.
          </Text>
        </Box>

        <Demo
          title="Full header"
          note="Context area (parent link and its actions) shows on narrow viewports only; leading and trailing actions show from regular up."
        >
          <PageHeader.Root
            size="large"
            role="banner"
            aria-label="Pull request title"
            colorPalette="blue"
          >
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <GoGitPullRequest size={16} />
              </PageHeader.LeadingVisual>
              <PageHeader.Title as="h3">
                PageHeader component initial layout explorations
              </PageHeader.Title>
              <PageHeader.TrailingVisual>
                <Badge variant="outline">Beta</Badge>
              </PageHeader.TrailingVisual>
            </PageHeader.TitleArea>
            <PageHeader.ContextArea>
              <PageHeader.ParentLink href="https://github.com/primer/react/pulls">
                Pull requests
              </PageHeader.ParentLink>
              <PageHeader.ContextAreaActions>
                <Button size="xs" variant="outline">
                  <GoGitBranch />
                  Main
                </Button>
                <IconButton size="xs" variant="outline" aria-label="More Options">
                  <GoKebabHorizontal />
                </IconButton>
              </PageHeader.ContextAreaActions>
            </PageHeader.ContextArea>
            <PageHeader.LeadingAction>
              <IconButton size="sm" variant="ghost" aria-label="Expand">
                <GoSidebarExpand />
              </IconButton>
            </PageHeader.LeadingAction>
            <PageHeader.TrailingAction>
              <IconButton size="sm" variant="ghost" aria-label="Edit">
                <GoPencil />
              </IconButton>
            </PageHeader.TrailingAction>
            <PageHeader.Actions>
              <Button size="sm" variant="outline" display={{ base: "none", md: "inline-flex" }}>
                Edit
              </Button>
              <Button size="sm" colorPalette="green">
                <Box as="span" display={{ base: "none", md: "inline" }}>
                  New pull request
                </Box>
                <Box as="span" display={{ base: "inline", md: "none" }}>
                  New
                </Box>
              </Button>
              <IconButton size="sm" variant="outline" aria-label="More Options">
                <GoKebabHorizontal />
              </IconButton>
            </PageHeader.Actions>
            <PageHeader.Description>
              <Badge colorPalette="green" variant="solid" borderRadius="full" paddingX="3">
                <GoGitPullRequest />
                Open
              </Badge>
              <Text fontSize="14px" color="fg.muted">
                <Link href="https://github.com/broccolinisoup" fontWeight="600" color="fg">
                  broccolinisoup
                </Link>{" "}
                wants to merge 3 commits into <Code size="sm">main</Code> from{" "}
                <Code size="sm">broccolinisoup/switch-to-new-underlineNav</Code>
              </Text>
            </PageHeader.Description>
            <PageHeader.Navigation as="nav" aria-label="Pull Request">
              <PullRequestTabs />
            </PageHeader.Navigation>
          </PageHeader.Root>
        </Demo>

        <Demo title="Title only (default, medium)">
          <PageHeader.Root role="banner" aria-label="Title">
            <PageHeader.TitleArea>
              <PageHeader.Title>Title</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader.Root>
        </Demo>

        <Demo title="Title size: large">
          <PageHeader.Root size="large" aria-label="Large title">
            <PageHeader.TitleArea>
              <PageHeader.Title>Large title</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader.Root>
        </Demo>

        <Demo title="Title size: subtitle">
          <PageHeader.Root size="subtitle" aria-label="Subtitle">
            <PageHeader.TitleArea>
              <PageHeader.Title as="h3">Subtitle</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader.Root>
        </Demo>

        <Demo
          title="Title size: responsive"
          note={<Code size="sm">{responsiveVariantSnippet}</Code>}
        >
          <PageHeader.Root
            size={{ base: "medium", md: "subtitle", xl: "large" }}
            aria-label="Responsive title"
          >
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <GoGitBranch size={16} />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Branches</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.Actions>
              <Button size="sm" colorPalette="green">
                New branch
              </Button>
            </PageHeader.Actions>
          </PageHeader.Root>
        </Demo>

        <Demo title="Leading and trailing visuals, with actions">
          <PageHeader.Root role="banner" aria-label="Title">
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual>
                <GoGitPullRequest size={16} />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Title</PageHeader.Title>
              <PageHeader.TrailingVisual>
                <Badge variant="outline">Beta</Badge>
              </PageHeader.TrailingVisual>
            </PageHeader.TitleArea>
            <PageHeader.Actions>
              <IconButton size="sm" variant="outline" aria-label="Workflows">
                <GoWorkflow />
              </IconButton>
              <IconButton size="sm" variant="outline" aria-label="Insights">
                <GoGraph />
              </IconButton>
              <Button size="sm" colorPalette="green">
                Add Item
                <GoTriangleDown />
              </Button>
              <IconButton size="sm" variant="outline" aria-label="Settings">
                <GoGear />
              </IconButton>
            </PageHeader.Actions>
          </PageHeader.Root>
        </Demo>

        <Demo
          title="hasBorder"
          note="A bottom border is drawn while the header has no visible navigation."
        >
          <PageHeader.Root hasBorder aria-label="Bordered header">
            <PageHeader.TitleArea>
              <PageHeader.Title>Title</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.Description>
              <Text fontSize="14px" color="fg.muted">
                created this branch 5 days ago · 14 commits · updated today
              </Text>
            </PageHeader.Description>
          </PageHeader.Root>
        </Demo>

        <Demo
          title="hasBorder with navigation"
          note="The navigation supplies the bottom edge, so the header draws no border of its own."
        >
          <PageHeader.Root hasBorder aria-label="Bordered header with navigation">
            <PageHeader.TitleArea>
              <PageHeader.Title>Pull request title</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.Navigation hideBelow="md">
              <PullRequestTabs />
            </PageHeader.Navigation>
          </PageHeader.Root>
        </Demo>

        <Demo
          title="Hidden per viewport"
          note="Chakra style props on the parts: leading visual hideFrom md, trailing visual hideBelow md, actions hideFrom xl, context area forced visible with display."
        >
          <PageHeader.Root aria-label="Hidden props">
            <PageHeader.TitleArea>
              <PageHeader.LeadingVisual hideFrom="md">
                <GoGitPullRequest size={16} />
              </PageHeader.LeadingVisual>
              <PageHeader.Title>Title</PageHeader.Title>
              <PageHeader.TrailingVisual hideBelow="md">
                <Badge variant="outline">Beta</Badge>
              </PageHeader.TrailingVisual>
            </PageHeader.TitleArea>
            <PageHeader.ContextArea display="flex">
              <PageHeader.ContextBar display="flex">
                <RepoBreadcrumbs />
              </PageHeader.ContextBar>
              <PageHeader.ContextAreaActions>
                <Button size="xs" variant="outline">
                  <GoGitBranch />
                  Main
                </Button>
              </PageHeader.ContextAreaActions>
            </PageHeader.ContextArea>
            <PageHeader.Actions hideFrom="xl">
              <Button size="sm" variant="outline">
                Hidden on wide
              </Button>
            </PageHeader.Actions>
          </PageHeader.Root>
        </Demo>

        <Demo
          title="Breadcrumbs and leading action"
          note="Leading action is hidden on narrow viewports by default."
        >
          <PageHeader.Root aria-label="PageHeader.tsx">
            <PageHeader.TitleArea>
              <PageHeader.Title>PageHeader.tsx</PageHeader.Title>
            </PageHeader.TitleArea>
            <PageHeader.LeadingAction>
              <IconButton size="sm" variant="ghost" aria-label="Expand">
                <GoSidebarExpand />
              </IconButton>
            </PageHeader.LeadingAction>
            <PageHeader.Breadcrumbs>
              <RepoBreadcrumbs />
            </PageHeader.Breadcrumbs>
          </PageHeader.Root>
        </Demo>
      </Stack>
    </Box>
  );
}
