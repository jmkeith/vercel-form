"use client";

import { Box, Heading, Stack, Tabs, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { GoGitPullRequest, GoIssueOpened, GoRepo } from "react-icons/go";
import { GlobalNav, TopNav } from "@/components/trango/components";

const crumbs = [
  { label: "primer", href: "#primer" },
  { label: "react", href: "#react" },
  { label: "Issues" },
];

export default function GlobalNavDemoPage() {
  return (
    <Stack as="main" gap="10" padding="6" colorPalette="blue">
      <Box>
        <Heading size="xl">TopNav and GlobalNav</Heading>
        <Text color="fg.muted">The center region moves to the end below `lg` (1024px).</Text>
      </Box>

      <Stack gap="3">
        <Heading size="md">TopNav</Heading>
        <Box borderWidth="1px" borderColor="border">
          <TopNav.Root aria-label="Site">
            <TopNav.Bar>
              <TopNav.Left>Left</TopNav.Left>
              <TopNav.Center>Center</TopNav.Center>
              <TopNav.Right>Right</TopNav.Right>
            </TopNav.Bar>
          </TopNav.Root>
        </Box>
      </Stack>

      <Stack gap="3">
        <Heading size="md">GlobalNav</Heading>
        <Box borderWidth="1px" borderColor="border">
          <GlobalNav.Root>
            <GlobalNav.Bar>
              <GlobalNav.Left>
                <GlobalNav.Logo href="#home" aria-label="Dashboard">
                  <FaGithub />
                </GlobalNav.Logo>
              </GlobalNav.Left>
              <GlobalNav.Center>
                <GlobalNav.Breadcrumbs items={crumbs} hideBelow="lg" />
                <GlobalNav.Search />
              </GlobalNav.Center>
              <GlobalNav.Right>
                <GlobalNav.Link href="#issues" aria-label="Issues" aria-current="page">
                  <GoIssueOpened />
                </GlobalNav.Link>
                <GlobalNav.Link href="#pulls" aria-label="Pull requests">
                  <GoGitPullRequest />
                </GlobalNav.Link>
                <GlobalNav.Link href="#repos" aria-label="Repositories" hideBelow="sm">
                  <GoRepo />
                </GlobalNav.Link>
              </GlobalNav.Right>
            </GlobalNav.Bar>
          </GlobalNav.Root>
        </Box>
      </Stack>

      <Stack gap="3">
        <Heading size="md">GlobalNav with local navigation</Heading>
        <Box borderWidth="1px" borderColor="border">
          <GlobalNav.Root hasLocalNavigation>
            <GlobalNav.Bar>
              <GlobalNav.Left>
                <GlobalNav.Logo href="#home" aria-label="Dashboard">
                  <FaGithub />
                </GlobalNav.Logo>
              </GlobalNav.Left>
              <GlobalNav.Center>
                <GlobalNav.Breadcrumbs items={crumbs} hideBelow="lg" />
                <GlobalNav.Search>Search this repository</GlobalNav.Search>
              </GlobalNav.Center>
              <GlobalNav.Right>
                <GlobalNav.Link href="#issues" aria-label="Issues">
                  <GoIssueOpened />
                </GlobalNav.Link>
              </GlobalNav.Right>
            </GlobalNav.Bar>
            <GlobalNav.Local>
              <Tabs.Root defaultValue="code" size="sm">
                <Tabs.List borderBottomWidth="0">
                  <Tabs.Trigger value="code">Code</Tabs.Trigger>
                  <Tabs.Trigger value="issues">Issues</Tabs.Trigger>
                  <Tabs.Trigger value="pulls">Pull requests</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </GlobalNav.Local>
          </GlobalNav.Root>
        </Box>
      </Stack>
    </Stack>
  );
}
