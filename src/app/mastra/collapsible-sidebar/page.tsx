"use client";

import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import {
  CollapsibleNavList,
  CollapsibleSidebar,
  useCollapsibleSidebarState,
} from "@/components/trango/components";
import { DemoNavItems } from "../nav-items";

// Inside a framed demo the sidebar is as tall as the frame, not the viewport.
const framed = { position: "relative", top: "auto", height: "auto", alignSelf: "stretch" } as const;

export default function CollapsibleSidebarDemoPage() {
  const remembered = useCollapsibleSidebarState({ storageKey: "mastra-demo.sidebar" });
  const resizable = useCollapsibleSidebarState();

  return (
    <Stack as="main" gap="10" padding="6" colorPalette="blue">
      <Box>
        <Heading size="xl">CollapsibleSidebar and CollapsibleNavList</Heading>
        <Text color="fg.muted">
          The toggle shrinks the sidebar to an icon rail; rows get tooltips and the Insights group
          becomes a popover.
        </Text>
      </Box>

      <Stack gap="3">
        <Heading size="md">Remembered state</Heading>
        <Flex height="420px" borderWidth="1px" borderColor="border" data-demo="remembered">
          <CollapsibleSidebar.Root
            aria-label="Repository"
            expanded={remembered.expanded}
            onExpandedChange={remembered.setExpanded}
            css={framed}
          >
            <CollapsibleSidebar.Body>
              <CollapsibleNavList.Root aria-label="Repository">
                <DemoNavItems />
              </CollapsibleNavList.Root>
            </CollapsibleSidebar.Body>
            <CollapsibleSidebar.Footer>
              <CollapsibleSidebar.Toggle />
            </CollapsibleSidebar.Footer>
          </CollapsibleSidebar.Root>
          <Box flex="1" padding="4" color="fg.muted">
            Content
          </Box>
        </Flex>
      </Stack>

      <Stack gap="3">
        <Heading size="md">Resizable, medium</Heading>
        <Flex height="420px" borderWidth="1px" borderColor="border" data-demo="resizable">
          <CollapsibleSidebar.Root
            aria-label="Repository, resizable"
            size="medium"
            resizable
            expanded={resizable.expanded}
            onExpandedChange={resizable.setExpanded}
            css={framed}
          >
            <CollapsibleSidebar.Body>
              <CollapsibleNavList.Root aria-label="Repository, resizable">
                <DemoNavItems current="Home" />
              </CollapsibleNavList.Root>
            </CollapsibleSidebar.Body>
            <CollapsibleSidebar.Footer>
              <CollapsibleSidebar.Toggle />
            </CollapsibleSidebar.Footer>
          </CollapsibleSidebar.Root>
          <Box flex="1" padding="4" color="fg.muted">
            Content
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
}
