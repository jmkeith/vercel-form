"use client";

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import {
  CollapsibleNavList,
  CollapsibleSidebar,
  NavList,
  ThreePanesLayout,
  useCollapsibleSidebarState,
} from "@/components/trango/components";
import { DemoNavItems } from "../nav-items";

const offset = { "--page-layout-sticky-offset": "64px" };

const lines = (count: number, text: string) =>
  Array.from({ length: count }, (_, index) => (
    <Text key={index} color="fg.muted">
      {text} {index + 1}
    </Text>
  ));

export default function ThreePanesLayoutDemoPage() {
  const sidebar = useCollapsibleSidebarState();

  return (
    <Stack as="main" gap="0" colorPalette="blue">
      <Box padding="6">
        <Heading size="xl">ThreePanesLayout</Heading>
        <Text color="fg.muted">
          Left pane from `md`, resizable middle pane from `xl`, content always. Below: the same
          with a collapsible left pane.
        </Text>
      </Box>

      <Box borderBlockWidth="1px" borderColor="border" data-demo="fixed">
        <ThreePanesLayout.Root css={offset}>
          <ThreePanesLayout.LeftPane aria-label="Lists">
            <NavList.Root aria-label="Lists">
              <NavList.Item href="#inbox" aria-current="page">
                Inbox
              </NavList.Item>
              <NavList.Item href="#assigned">Assigned to me</NavList.Item>
              <NavList.Item href="#mentions">Mentions</NavList.Item>
            </NavList.Root>
          </ThreePanesLayout.LeftPane>
          <ThreePanesLayout.MiddlePane aria-label="Items" widthStorageKey="mastra-demo.three.middle">
            <Stack gap="3">{lines(12, "Item")}</Stack>
          </ThreePanesLayout.MiddlePane>
          <ThreePanesLayout.Content>
            <Stack gap="3">{lines(40, "Detail line")}</Stack>
          </ThreePanesLayout.Content>
        </ThreePanesLayout.Root>
      </Box>

      <Box padding="6">
        <Heading size="md">Collapsible left pane</Heading>
      </Box>
      <Box borderBlockWidth="1px" borderColor="border" data-demo="collapsible">
        <ThreePanesLayout.Root css={offset} sidebarDivider="none">
          <ThreePanesLayout.CollapsibleLeftPane
            aria-label="Repository"
            expanded={sidebar.expanded}
            onExpandedChange={sidebar.setExpanded}
          >
            <CollapsibleSidebar.Body>
              <CollapsibleNavList.Root aria-label="Repository">
                <DemoNavItems />
              </CollapsibleNavList.Root>
            </CollapsibleSidebar.Body>
            <CollapsibleSidebar.Footer>
              <CollapsibleSidebar.Toggle />
            </CollapsibleSidebar.Footer>
          </ThreePanesLayout.CollapsibleLeftPane>
          <ThreePanesLayout.MiddlePane aria-label="Items">
            <Stack gap="3">{lines(12, "Item")}</Stack>
          </ThreePanesLayout.MiddlePane>
          <ThreePanesLayout.Content>
            <Stack gap="3">{lines(60, "Detail line")}</Stack>
          </ThreePanesLayout.Content>
        </ThreePanesLayout.Root>
      </Box>
    </Stack>
  );
}
